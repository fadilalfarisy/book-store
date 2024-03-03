import { verifyAccessToken } from "../service/jwt-service.js";

export const authAdmin = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).json({
            errors: "Unauthorized"
        }).end();
    }

    const [error, decoded] = verifyAccessToken(token)
    if (error || decoded.role != 'ADMIN') {
        return res.status(401).json({
            errors: "Unauthorized"
        }).end();
    }

    req.decoded = decoded;
    next();
}

export const authUser = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).json({
            errors: "Unauthorized"
        }).end();
    }

    const [error, decoded] = verifyAccessToken(token)
    if (error) {
        return res.status(401).json({
            errors: "Unauthorized"
        }).end();
    }

    req.decoded = decoded;
    next();
}
