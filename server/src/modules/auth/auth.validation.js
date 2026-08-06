import validator from "validator";

export const validateRegisterData = ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isLength(name, { min: 3, max: 50 })) {
    throw new Error("Name must be between 3 and 50 characters");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  }

  if (!validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })) {
    throw new Error(
      "Password must be at least 8 characters and include uppercase, lowercase, number and symbol"
    );
  }
};

export const validateProfileUpdate = (data) => {
  const { name, bio } = data;

  if (!name || name.trim().length < 3) {
    throw new Error("Name must be at least 3 characters");
  }

  if (bio && bio.length > 250) {
    throw new Error("Bio cannot exceed 250 characters");
  }
};