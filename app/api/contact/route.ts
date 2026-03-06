import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from("contact_submissions").insert({ name, email, message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
