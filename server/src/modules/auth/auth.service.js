import bcrypt from "bcryptjs";
import User from "./auth.model.js";
import { validateRegisterData } from "./auth.validation.js";
import { sanitizeUser } from "../../utils/sanitizeUser.js";
import jwt from "jsonwebtoken";

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