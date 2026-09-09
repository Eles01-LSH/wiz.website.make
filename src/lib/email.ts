import nodemailer from "nodemailer";
import { createAdminClient } from "@/lib/supabase/admin";
import { CONTACT_INFO, CONTACT_ATTACHMENTS_BUCKET } from "@/data/contact";

const NAVER_MAIL_USER = process.env.NAVER_MAIL_USER;
const NAVER_MAIL_PASSWORD = process.env.NAVER_MAIL_PASSWORD;
const TO_EMAIL = CONTACT_INFO.find((info) => info.label === "EMAIL")?.value ?? "";

// 첨부파일은 Supabase Storage에 브라우저가 직접 업로드한 뒤, 여기서는
// 그 저장 경로(path)만 받아 서명된 다운로드 링크를 만든다 — 실제 파일
// 바이트는 이메일 발송 요청 본문에 실리지 않는다.
export type ContactAttachment = { filename: string; path: string };

const SIGNED_URL_EXPIRY_SECONDS = 60 * 60 * 24 * 30; // 30일

async function createAttachmentLinks(attachments: ContactAttachment[]) {
  if (attachments.length === 0) return [];

  const supabase = createAdminClient();
  const links: { filename: string; url: string }[] = [];

  for (const attachment of attachments) {
    const { data, error } = await supabase.storage
      .from(CONTACT_ATTACHMENTS_BUCKET)
      .createSignedUrl(attachment.path, SIGNED_URL_EXPIRY_SECONDS);

    if (error || !data?.signedUrl) {
      console.error("첨부파일 링크 생성 실패:", attachment.path, error);
      continue;
    }

    links.push({ filename: attachment.filename, url: data.signedUrl });
  }

  return links;
}

export type ContactPayload = {
  company?: string;
  contactName?: string;
  phone: string;
  email?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  attachments?: ContactAttachment[];
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char
  );
}

// 네이버는 아이디만 입력받는 경우가 많아, "user" 또는 "user@naver.com" 어느 쪽을 넣어도 되도록 정규화
function toNaverLoginId(value: string) {
  return value.replace(/@naver\.com$/i, "");
}

function getTransporter() {
  if (!NAVER_MAIL_USER || !NAVER_MAIL_PASSWORD) {
    throw new Error("NAVER_MAIL_USER / NAVER_MAIL_PASSWORD가 설정되지 않았습니다.");
  }

  return nodemailer.createTransport({
    host: "smtp.naver.com",
    port: 465,
    secure: true,
    auth: {
      user: toNaverLoginId(NAVER_MAIL_USER),
      pass: NAVER_MAIL_PASSWORD,
    },
  });
}

export async function sendContactEmail(payload: ContactPayload) {
  if (!TO_EMAIL) {
    throw new Error("문의를 받을 수신 이메일(CONTACT_INFO)이 설정되지 않았습니다.");
  }

  const transporter = getTransporter();
  const senderAddress = `${toNaverLoginId(NAVER_MAIL_USER!)}@naver.com`;

  const rows: [string, string | undefined][] = [
    ["회사/기관명", payload.company],
    ["담당자명", payload.contactName],
    ["연락처", payload.phone],
    ["이메일", payload.email],
    ["프로젝트 종류", payload.projectType],
    ["예상 예산", payload.budget],
    ["희망 제작 일정", payload.timeline],
  ];

  const rowsHtml = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;white-space:nowrap;">${label}</td><td style="padding:4px 0;color:#0b0b0c;">${escapeHtml(
          String(value)
        )}</td></tr>`
    )
    .join("");

  const attachmentLinks = await createAttachmentLinks(payload.attachments ?? []);
  const attachmentsHtml = attachmentLinks.length
    ? `
      <p style="margin-top:20px;font-weight:700;">첨부 자료 (링크는 30일간 유효)</p>
      <ul style="margin:8px 0 0;padding-left:18px;">
        ${attachmentLinks
          .map(
            (a) =>
              `<li><a href="${a.url}" style="color:#1d4ed8;">${escapeHtml(a.filename)}</a></li>`
          )
          .join("")}
      </ul>
    `
    : "";

  const html = `
    <div style="font-family:sans-serif;font-size:14px;color:#0b0b0c;">
      <h2 style="margin:0 0 16px;">새로운 제작 문의가 도착했습니다</h2>
      <table style="border-collapse:collapse;">${rowsHtml}</table>
      <p style="margin-top:16px;white-space:pre-wrap;line-height:1.6;">${escapeHtml(payload.message)}</p>
      ${attachmentsHtml}
    </div>
  `;

  await transporter.sendMail({
    from: `WIZ CNI 웹사이트 <${senderAddress}>`,
    to: TO_EMAIL,
    replyTo: payload.email || undefined,
    subject: `[WIZ CNI 문의] ${payload.company || payload.contactName || "새 문의"}`,
    html,
  });
}
