import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/auth";
import { getSurveyResponses } from "@/lib/survey";
import { surveyWorkbookResponse } from "@/lib/survey-export";

export async function GET() {
  const auth = await requireAdmin();
  if ("response" in auth) return auth.response;

  try {
    const responses = await getSurveyResponses();
    return surveyWorkbookResponse(responses);
  } catch {
    return NextResponse.json(
      { error: "설문 응답을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
