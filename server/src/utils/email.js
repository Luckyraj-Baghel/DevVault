import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendPasswordResetEmail = async (
    email,
    resetUrl
) => {
    await transporter.sendMail({
        from: `"DevVault" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: "Reset Your DevVault Password",

        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Reset Your DevVault Password</h2>

        <p>
          We received a request to reset your DevVault password.
        </p>

        <p>
          Click the button below to create a new password.
        </p>

        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #4f46e5;
            color: white;
            text-decoration: none;
            border-radius: 8px;
          "
        >
          Reset Password
        </a>

        <p style="margin-top: 20px;">
          This link will expire in 15 minutes.
        </p>

        <p>
          If you did not request a password reset, you can safely ignore this email.
        </p>
      </div>
    `,
    });
};