import jwt from "jsonwebtoken";

export const createToken = (user: {}, tokenType: "refresh" | "access"): string => { 

    let token;
    const secretKey = (tokenType === "refresh") ? process.env.JWT_REFRESH_SECRET_KEY as string : process.env.JWT_ACCESS_SECRET_KEY as string;
    const expiresIn = (tokenType === "refresh") ? '7d' : '15m';

    if (!secretKey) {
        throw new Error(`JWT ${tokenType.toUpperCase()} SECRET KEY is not defined in environment variables`);
    }

    try {
        token = jwt.sign(user, secretKey, { expiresIn });
    } catch (error) {
        throw new Error(`Error creating ${tokenType} token: ${error}`);
    }
    return token ;
}