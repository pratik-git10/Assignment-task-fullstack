import bcrypt from "bcrypt";

const Register = async (req, res) => {
  try {
    let { name, email, address, password } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();
    address = address?.trim();

    // Required fields validation
    if (!name || !email || !address || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (name.length < 3 || name.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 3 and 50 characters.",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain 8-20 characters, one uppercase letter, one lowercase letter, one number and one special character.",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      address,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const Login = async (req, res) => {};
const Logout = async (req, res) => {};

export { Register, Login, Logout };
