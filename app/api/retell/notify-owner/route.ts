import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { emergency_type, details } = await req.json();

    if (!emergency_type || !details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const ownerEmail = process.env.OWNER_EMAIL;

    if (resendKey && ownerEmail) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "alerts@offthehookyyc.ca",
          to: ownerEmail,
          subject: `URGENT — ${emergency_type.toUpperCase()} at Off the Hook`,
          html: `
            <h2 style="color: red;">URGENT ALERT</h2>
            <p><strong>Type:</strong> ${emergency_type}</p>
            <p><strong>Details:</strong> ${details}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString("en-CA", { timeZone: "America/Edmonton" })}</p>
            <p><em>This alert was triggered by the Off the Hook voice assistant.</em></p>
          `,
        }),
      });
    }

    // SMS via Twilio if configured
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_FROM_NUMBER;
    const ownerPhone = process.env.OWNER_PHONE;

    if (twilioSid && twilioToken && twilioFrom && ownerPhone) {
      const body = `URGENT [${emergency_type.toUpperCase()}] at Off the Hook: ${details}`;
      await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ From: twilioFrom, To: ownerPhone, Body: body }),
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Owner has been notified. Please call 911 if this is a life-threatening emergency.",
    });
  } catch (error) {
    console.error("Retell notify-owner error:", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
