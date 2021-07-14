const { User } = require("../models");
const { verifyToken } = require("../token/token");
const asyncHandler = require("express-async-handler");

module.exports = {
  auth: asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
      throw new Error("토큰이 없음");
    }

    if (token.startsWith("Bearer")) {
      try {
        let decoded = verifyToken(token.split(" ")[1]);

        req.tokenUser = await User.findOne({
          where: { id: decoded },
        });

        next();
      } catch (err) {
        throw err;
      }
    }
  }),
};
