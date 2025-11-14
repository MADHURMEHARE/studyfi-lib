import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { phone } = body;

    if (!phone) {
      return new Response(
        JSON.stringify({ message: "Phone required" }),
        { status: 400 }
      )
    };


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OWNER_EMAIL,
        pass: process.env.OWNER_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Studyfi.com" <${process.env.OWNER_EMAIL}>`,
      to: process.env.OWNER_EMAIL,
      subject: "📩 New customer Phone Number ",
      html: `
        <h2>New Phone Number Submitted</h2>
        <p><strong>Phone:</strong> ${phone}</p>
        <p>Submitted from your website.</p>
      `,
    });

    return new Response(
      JSON.stringify({ message: "Sent to owner" }),
      { status: 200 }
    );

  } catch (err) {
    console.error("Mail Error:", err);
    return new Response(
      JSON.stringify({ message: "Email failed", error: err.message }),
      { status: 500 }
    );
  }
}
