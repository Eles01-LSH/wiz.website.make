import { NextResponse } from "next/server";
import { getSurveyResponsesPublic } from "@/lib/survey";
import { surveyWorkbookResponse } from "@/lib/survey-export";

/**
 * /survey-results(로그인 없이 보는 공개 결과 페이지)용 다운로드.
 * 관리자 인증 없이 누구나 호출 가능 — 공개 페이지 자체가 그런 요구사항으로
 * 만들어진 것이므로 의도된 동작이다.
 */
export async function GET() {
  try {
    const responses = await getSurveyResponsesPublic();
    return surveyWorkbookResponse(responses);
  } catch {
    return NextResponse.json(
      { error: "설문 응답을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
