const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "DevVault",
        email: process.env.EMAIL_FROM,
      },
      to: [{ email }],
      subject: "Reset Your DevVault Password",
      htmlContent: `
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
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("❌ BREVO EMAIL ERROR:", response.status, errorData);
    throw new Error("Failed to send password reset email. Please try again later.");
  }
};