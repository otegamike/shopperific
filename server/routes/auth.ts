import e, { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { connectDB } from "../utils/db.js";
import { createToken } from "../utils/createToken.js";
import {addDevice} from "../utils/addDevice.js";
import { connectToDb } from "../middleware/connectToDb.js";
import type { TypedRequest, TypedResponse, loginRequestBody, registerRequestBody, NewUSerOBj } from "../utils/types/utilTypes.js";

// for Email Verification 
import { genToken, verifyurl, hashToken } from "../services/EmailVerificationToken.js";
import { sendVerifyEmail } from "../services/sendMail.js";
import { getFromDb } from "../services/fetchFromDb.js";
import { RegisterUserType } from "../models/User.js";

const router = Router();
console.log("auth routes");

// Register Route
router.post("/register", async (req: TypedRequest<registerRequestBody>, res: TypedResponse<{ message: string, newUser?: any }>) => {

    const { firstName, lastName , email, password, role } = req.body;
    const deviceId = req.headers["x-device-id"] as string;

    if (!deviceId || !email || !password || !firstName || !lastName || !role) {
        return res.status(400).json({ message: "Full name, Email, password, and role are required." });
    }

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(password, salt);

        const userData : RegisterUserType = {
            firstName,
            lastName,
            email,
            password: hashedpassword,
            role
        };

        const newUser = new User(userData);
        

        const genEmailToken = genToken();
        if (!genEmailToken.generated) {
            return res.status(500).json({message: "internal server error. Please Try again later"});
        }

        newUser.emailVerificationToken = genEmailToken.hashedToken;
        newUser.emailVerificationCode = genEmailToken.hashedCode;
        newUser.emailverificationExpiresAt = genEmailToken.expiresAt;

        const verificationCode = genEmailToken.code as string;
        const verificationUrl = verifyurl(genEmailToken.token as string);

        // Send user email.
        const sendUserEmail = await sendVerifyEmail(firstName, email, verificationCode, verificationUrl);

        // Check if email was sent.
        if (!sendUserEmail.sent) {
            return res.status(500).json({message: "internal server error. Please Try again later"});
        }

        await newUser.save();

        // Create RefreshToken with user info
        const newUserid = newUser._id.toString();
        const newUserObj: NewUSerOBj = { userId: newUserid, email: newUser.email, role: newUser.role };
        const refreshToken = createToken(newUserObj , "refresh");
        
        // Add device and refreshToken to user's refreshTokens array
        const refreshTokenArr = addDevice( [], deviceId, refreshToken, newUser.createdAt );
        newUser.refreshTokens = refreshTokenArr;
        await newUser.save();

        // Set refresh token in HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        console.log("New user registered");
        return res.status(201).json({ message: "User registered successfully." , newUser});

    } catch (error) {

        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error during registration."});
    }

}); 

// Login Route
router.post("/login", async (req: TypedRequest<loginRequestBody>, res) => { 
    const { email, password } = req.body;
    const deviceId = req.headers["x-device-id"] as string;

    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required." });
        return;
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: "Email or Username not found. Create a new account." });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({ message: "Password incorrect try again." });
            console.log("Incorrect password for user:", email)
            return;
        }

        // Create RefreshToken with user info
        const userId = user._id.toString();
        const userObj: NewUSerOBj = { userId, email: user.email, role: user.role };
        const refreshToken = createToken(userObj , "refresh");
        const accessToken = createToken(userObj , "access");

        // Add device and refreshToken to user's refreshTokens array
        const refreshTokenArr = addDevice( user.refreshTokens, deviceId, refreshToken, new Date() );
        user.refreshTokens = refreshTokenArr;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.setHeader("Authorization", `Bearer ${accessToken}`);

        console.log("User logged in:", user);
        return res.status(200).json({ message: "Login successful.", user: { email: user.email, role: user.role } });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Couldn't log you in. Please try again." });
    }

});

router.get('/verify-email', async (req, res) => {
    const token = req.query.token || req.body.code;

    if (!token) {
        return res.status(403).json({ error : "Missing verification Code or token." });
    }

    console.log("verifying Email...");

    const hash = hashToken(token);
    if (!hash.hashed) { 
        return res.status(500).json({ error : "internal server error. Please try again." });
    }

    const hashedToken = hash.hashedToken as string;

    const user = await User.findOne({
        $or: [
            { emailVerificationToken: hashedToken},
            { emailVerificationCode: hashedToken}
        ],
        emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({
        message: "Invalid or expired verification code",
        });
    }

    user.isEmailVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();
   
    return res.status(200).json({ message: "your account has successfully been verified" });

})

router.get('/test', async (req, res) => {

    const getUser = await getFromDb("user", {email: "yellowr@test.com"}, "role" , 1);
    if (getUser?.found && getUser.data) {
        return res.status(200).json( getUser.data );
    } else {
        return res.status(500).json({ error : "internal server error. Please try again." });
    }
    
});

export default router;