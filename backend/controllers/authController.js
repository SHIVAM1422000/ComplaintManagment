const User = require("../models/User");
const Company = require("../models/Company");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      company: user?.company.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, companyName } = req.body;
    console.log(name, email, password, role, companyName);

    // Create or assign company
    let company = await Company.findOne({ slug: companyName.toLowerCase() });
    if (!company) {
      const slug = companyName.toLowerCase().replace(/\s+/g, "-");
      company = await Company.create({ name: companyName, slug });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
      company: company._id,
    });


    res.status(200).json({
      success: true,
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: company.slug,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, companySlug } = req.body;

    // 1️⃣ Validate input
    if (!email || !password || !companySlug) {
      return res.status(400).json({
        success: false,
        message: "Email, password and company are required",
      });
    }

    const normalizedEmail = email?.toLowerCase()?.trim();
    const normalizedSlug = companySlug?.toLowerCase()?.trim();

    // 2️⃣ Find company first (tenant isolation)
    const company = await Company.findOne({ slug: normalizedSlug });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Invalid company",
      });
    }

    // 3️⃣ Find user INSIDE the company
    const user = await User.findOne({
      email: normalizedEmail,
      company: company._id,
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }


    console.log("LOgged In " , user);
    res.status(200).json({
      success: true,
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: company.slug,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({
      success: false,
      message: err || "Server Error",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("company");
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};
