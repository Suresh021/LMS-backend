import jwt from "jsonwebtoken";

// ✅ Verify Token Middleware
export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user data to request
        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};



// ✅ Role-Based Access Control Middleware
export const checkRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};