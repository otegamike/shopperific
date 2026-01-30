import { Router } from "express";
import { hashToken } from "../../services/EmailVerificationToken.js";
import { findAndUpdate } from "../../services/saveToDb.js";
import { genToken } from "../../services/EmailVerificationToken.js";
import { sendVerifyEmail } from "../../services/sendMail.js";

// Types 
import { VerifyEmailType } from "../../models/User.js";
import { toObjectId } from "../../lib/mongoose.js";

const router = Router();



router.get('/',  async (req, res) => {

    const token = req.query.token ;
    const email = req.user?.email;

    if (!email || typeof email !== "string") {
        return res.status(403).json({ error : "Unauthorized Access is forbiden" });
    }

    if (!token || typeof token !== "string") {
        return res.status(403).json({ error : "Missing verification Code or token." });
    }

    console.log("verifying Email...");

    const hash = hashToken(token);
    if (!hash.hashed) { 
        return res.status(500).json({ error : "internal server error. Please try again." });
    }

    const hashedToken = hash.hashedToken;
    const findBy =  { email, emailVerificationToken: hashedToken, emailVerificationExpires: { $gt: Date.now() } };
    const set = { 
        isEmailVerified: true, 
        $unset: { emailVerificationToken: 1, emailVerificationCode: 1, emailVerificationExpiresAt: 1 , }
    }

    const update = await findAndUpdate("user", findBy, set);
    if (!update.updated) {
        return res.status(500).json({message: "internal server error"});
    } else {
        res.status(201).json({message: "Email verified successfully"});
    }

})

router.post('/',  async (req, res) => {

    const code = req.body.code ;
    const email = req.user?.email;

    if (!email || typeof email !== "string") {
        return res.status(403).json({ error : "Unauthorized Access is forbiden" });
    }

    if (!code || typeof code !== "string") {
        return res.status(403).json({ error : "Missing verification Code or token." });
    }

    console.log("verifying Email...");

    const hash = hashToken(code);
    if (!hash.hashed) { 
        return res.status(500).json({verified: false, error : "internal server error. Please try again." });
    }

    const hashedCode = hash.hashedToken;
    const findBy =  { email, emailVerificationCode: hashedCode, emailVerificationExpiresAt: { $gt: Date.now() } };
    const set = { 
        isEmailVerified: true, 
        $unset: { emailVerificationToken: 1, emailVerificationCode: 1, emailVerificationExpiresAt: 1 , }
    }

    const update = await findAndUpdate("user", findBy, set);
    if (!update.updated) {
        return res.status(500).json({verified: false, error: "internal server error"});
    } else {
        console.log("Email verified successfully");
        console.log(update);
        return res.status(201).json({verified: true, message: "Email verified successfully"});
        
    }

})

router.post('/new',  async (req, res) => { 
    const email = req.user?.email as string;
    const userId = req.user?.userId;
    const clientEmail = req.body.email.toLowerCase();
    const firstName = req.body.firstName;

    if (!email || typeof email !== "string" || clientEmail !== email || !firstName || typeof firstName !== "string") {
        console.log("Forbidden; one of the fields is missing or invalid", email, clientEmail, firstName, userId);
        return res.status(403).json({ error : "Forbidden; one of the fields is missing or invalid" });
    }

    console.log("Generating token...");

    const genEmailToken = genToken();

    if ( !genEmailToken.generated ) {
        console.log("Couldn't generate token");
        return res.status(500).json({error: "Internal server error."});
        
    }

     // indicate fields to set.
    const set: VerifyEmailType = {
        emailVerificationToken: genEmailToken.hashedToken, 
        emailVerificationCode: genEmailToken.hashedCode, 
        emailVerificationExpiresAt: genEmailToken.expiresAt,
        isEmailVerified: false
    }

    const storeToken = await findAndUpdate("user", {email, _id: toObjectId(userId as string) }, set )

    // // Exit if generated token wasn't stored.
    // if (!storeToken.updated) {
    //     console.log("Couldn't store token");
    //     return res.status(500).json({sent: false, error : "Internal sever error. Please try again."});
    // }

    // // Send Email to user.
    // const mail = await sendVerifyEmail(firstName, email, genEmailToken.code, genEmailToken.url);

    // if (!mail.sent) {
    //     console.log("Couldn't send mail");
    //     return res.status(500).json({sent: false, error : "Internal sever error.  Please Try again later"});
    // }

    res.status(200).json({ sent: true, message: "Code sent to your email.", code: genEmailToken.code})
    return console.log("Email sent to user.");
})

export default router;