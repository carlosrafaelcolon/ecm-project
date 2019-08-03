const {
  User
} = require("../controllers/users.controller")

// Check for an authenticated reviewer user
module.exports.authCheck = async (req, res, next) => {
  try {
    const userJwt = req.get("Authorization").slice("Bearer ".length)
    const user = await User.decoded(userJwt)
    var {
      error
    } = user
    if (error) {
      res.status(401).json({
        error
      })
      return
    }
    next();
  } catch (e) {
    res.status(500).json({ e })
  }
};