import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/VerificationEmail";

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> => {
  try {
    const SENDER_EMAIL = process.env.SENDER_EMAIL;

    const result = await resend.emails.send({
      from: `FeedBackFusion <${SENDER_EMAIL}>`,
      to: email,
      subject: "Verify Your Email - FeedBackFusion",
      react: VerificationEmail({
        username,
        otp: verifyCode,
      }),
    });

    return { success: true, message: "Verification email sent" };
  } catch (err) {
    console.error("Error sending verification email", err);
    return { success: false, message: "Error sending verification email" };
  }
};
