import bcrypt from "bcryptjs";
import User from "./auth.model.js";
import {
  validateRegisterData,
  validateChangePassword,
  validateResetPassword,
  validateProfileUpdate,
} from "./auth.validation.js";
import { sanitizeUser } from "../../utils/sanitizeUser.js";
import { sendPasswordResetEmail } from "../../utils/email.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const registerUser = async (userData) => {
    // Validate user input
    validateRegisterData(userData);

    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return userResponse;
    return sanitizeUser(user);
};

export const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    return {
        user: sanitizeUser(user),
        token,
    };
};

export const getCurrentUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return sanitizeUser(user);
};

export const updateProfile = async (userId, profileData) => {
  validateProfileUpdate(profileData);

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.name = profileData.name;
  user.bio = profileData.bio || "";
  user.github = profileData.github || "";
  user.linkedin = profileData.linkedin || "";
  user.portfolio = profileData.portfolio || "";

  await user.save();

  return sanitizeUser(user);
};


export const changePassword = async (
  userId,
  passwordData
) => {
  validateChangePassword(passwordData);

  const {
    currentPassword,
    newPassword,
  } = passwordData;

  const user = await User.findById(userId).select(
    "+password"
  );

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatched =
    await bcrypt.compare(
      currentPassword,
      user.password
    );

  if (!isPasswordMatched) {
    throw new Error(
      "Current password is incorrect"
    );
  }

  const hashedPassword =
    await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();

  return true;
};

export const forgotPassword = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    throw new Error("No account found with this email");
  }

  // Generate secure random token
  const resetToken = crypto
    .randomBytes(32)
    .toString("hex");

  // Hash token before storing in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;

  // Token valid for 15 minutes
  user.resetPasswordExpire =
    Date.now() + 15 * 60 * 1000;

  await user.save();

  // Frontend reset page
  const resetUrl =
    `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await sendPasswordResetEmail(
    user.email,
    resetUrl
  );

  return true;
};

export const resetPassword = async (
  resetToken,
  passwordData
) => {
  validateResetPassword(passwordData);

  if (!resetToken) {
    throw new Error("Reset token is required");
  }

  // Hash the token received from the reset link
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Find user with matching token and valid expiry
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  }).select("+password");

  if (!user) {
    throw new Error("Invalid or expired reset token");
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(
    passwordData.newPassword,
    10
  );

  user.password = hashedPassword;

  // Invalidate reset token
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save();

  return true;
};