import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../../services/auth.service";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        setLoading(true);

        try {
            await forgotPassword({ email });

            setSubmitted(true);

            toast.success(
                "If an account exists, a reset link has been sent"
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center">
                    Forgot Password?
                </h1>

                <p className="text-gray-500 text-center mt-2 mb-8">
                    Enter your email and we'll send you a link
                    to reset your password.
                </p>

                {submitted ? (
                    <div className="text-center">

                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                            <p className="text-green-700 text-sm">
                                If an account exists with this email,
                                you will receive a password reset link.
                            </p>
                        </div>

                        <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Back to Login
                        </Link>

                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your registered email"
                                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading
                                ? "Sending..."
                                : "Send Reset Link"}
                        </button>

                        <div className="text-center">
                            <Link
                                to="/login"
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                ← Back to Login
                            </Link>
                        </div>
                    </form>
                )}

            </div>
        </div>
    );
};

export default ForgotPasswordPage;