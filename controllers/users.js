const User = require("../models/user.js");
const Listing = require("../models/listing.js");

// Render Signup Form
module.exports.renderSignupForm = (req, res) => {
  return res.render("users/signup.ejs");
};

// Show Profile
module.exports.showProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return res.render("users/profile", { user });
};

// Show User Listings
module.exports.showMyListings = async (req, res) => {
  const { id } = req.params;
  const userListings = await Listing.find({ owner: id }).populate("owner");
  const user = userListings.length > 0 ? userListings[0].owner : null;
  return res.render("users/mylistings", { userListings, user });
};

// Signup Controller
module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      return res.redirect("/listings"); // ✅ IMPORTANT RETURN
    });

  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/signup"); // ✅ IMPORTANT RETURN
  }
};

// Render Login Form
module.exports.renderLoginForm = (req, res) => {
  return res.render("users/login.ejs");
};

// Login Controller
module.exports.login = async (req, res, next) => {
  req.flash("success", "Welcome back to Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  return res.redirect(redirectUrl); // ✅ RETURN
};

// Logout Controller
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    return res.redirect("/listings"); // ✅ RETURN
  });
};