import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword as changePasswordService,
  forgotPassword,
  resetPassword,
} from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
      })
      .json({
        success: true,
        message: "Login successful",
        data: user,
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await getCurrentUser(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const user = await updateProfile(
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

export const changePassword = async (req, res) => {
  try {
    await changePasswordService(
      req.user.id,
      req.body
    );

    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .status(200)
      .json({
        success: true,
        message:
          "Password changed successfully. Please login again.",
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    await forgotPassword(req.body.email);

    res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.body;

    await resetPassword(
      token,
      req.body
    );

    res.status(200).json({
      success: true,
      message:
        "Password reset successfully. Please login again.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};