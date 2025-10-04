import jwt from "jsonwebtoken"


export const isAuthenticated = async (req, res, next) => {
    try {
        let token = req.cookies?.token;

        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        req.id = decoded.userId;
        next();
    } catch (error) {
        console.log(error);

    }
}