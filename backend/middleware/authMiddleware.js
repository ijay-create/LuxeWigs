import jwt from "jsonwebtoken";

/**
 * PROTECT ROUTES (USER AUTH)
 */
export const protect = (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  // CHECK TOKEN FORMAT
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Token missing"
        });
      }

      // VERIFY TOKEN
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // ATTACH USER TO REQUEST
      req.user = {
        id: decoded.id,
        email: decoded.email,
        isAdmin: decoded.isAdmin || false
      };

      next();

    } catch (error) {

      console.error("JWT Error:", error.message);

      return res.status(401).json({
        message: "Token invalid or expired"
      });

    }
  } else {
    return res.status(401).json({
      message: "Authorization header missing"
    });
  }
};

/**
 * ADMIN ONLY MIDDLEWARE
 */
export const adminOnly = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      message: "Not authenticated"
    });
  }

  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      message: "Admin access only"
    });
  }

};