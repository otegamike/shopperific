import e, { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { connectDB } from "../utils/db.js";
import { createToken } from "../utils/createToken.js";
import {addDevice} from "../utils/addDevice.js";
import { connectToDb } from "../middleware/connectToDb.js";
import type { TypedRequest, TypedResponse, loginRequestBody, registerRequestBody, NewUSerOBj } from "../utils/types/utilTypes.js";

const router = Router();

// Register Route
router.post("/register", connectToDb, async (req: TypedRequest<registerRequestBody>, res: TypedResponse<{ message: string, newUser?: any }>) => {

    const { deviceId, email, password, role } = req.body;

    if (!deviceId || !email || !password || !role) {
        return res.status(400).json({ message: "Email, password, and role are required." });
    }

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedpassword,
            role
        });

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
    const { deviceId, email, password } = req.body;

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

export default router;