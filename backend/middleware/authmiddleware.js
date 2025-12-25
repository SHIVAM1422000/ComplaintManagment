const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    // console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //explicit failure logs + early return
    if (!decoded?.id || !decoded?.company) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    const user = await User.findById(decoded.id).populate("company");
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    //Company Slug Verification
    const companySlug = req.headers["x-company-slug"] || req.query.company;
    if (!companySlug) {
      return res.status(400).json({ message: "Company header missing" });
    }
    if (user.company.slug !== companySlug.toLowerCase()) {
      return res.status(403).json({ message: "Cross-tenant access denied" });
    }

    req.user = {
      id: user._id,
      role: user.role,
      company: user.company,
    };

    // console.log("Auth cheeck passed",user.email);

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token expired or invalid", error: err.message });
  }
};
