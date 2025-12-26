import e, { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { connectDB } from "../utiils/db.js";
import type { TypedRequest, loginRequestBody, registerRequestBody } from "../utiils/types/utilTypes.js";

const router = Router();

// Register Route
router.post("/register", async (req: TypedRequest<registerRequestBody>, res) => {

    const { email, password, role} = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: "Email, password, and role are required." });
    }

    try {

        await connectDB();

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
        console.log("New user registered:", email);
        res.status(201).json({ message: "User registered successfully." });

    } catch (error) {

        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error during registration." });
    }

}); 

// Login Route
router.post("/login", async (req: TypedRequest<loginRequestBody>, res) => { 
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required." });
        return;
    }

    try {
        await connectDB();
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
        res.status(200).json({ message: "Login successful.", user: { email: user.email, role: user.role } });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Couldn't log you in. Please try again." });
    }

});

export default router;