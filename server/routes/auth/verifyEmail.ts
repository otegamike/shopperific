import { Router } from "express";
import { hashToken } from "../../services/EmailVerificationToken";
import { findAndUpdate } from "../../services/saveToDb";
import { genToken } from "../../services/EmailVerificationToken";
import { sendVerifyEmail } from "../../services/sendMail";

// Types 
import { VerifyEmailType } from "../../models/User";

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
        $unset: { emailVerificationToken: 1, emailVerificationCode: 1, emailverificationExpiresAt: 1 , }
    }

    const update = await findAndUpdate("user", findBy, set);
    if (!update.updated) {
        return res.status(500).json({message: "internal server error"});
    } else {
        res.status(201).json({message: "Email verified successfully"});
    }

})

router.post('/',  async (req, res) => {

    const token = req.body.code ;
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
        $unset: { emailVerificationToken: 1, emailVerificationCode: 1, emailverificationExpiresAt: 1 , }
    }

    const update = await findAndUpdate("user", findBy, set);
    if (!update.updated) {
        return res.status(500).json({message: "internal server error"});
    } else {
        res.status(201).json({message: "Email verified successfully"});
    }

})

router.get('/new',  async (req, res) => { 
    const email = req.user?.email as string;
    const userId = req.user?.userId;

    const genEmailToken = genToken();

    if ( !genEmailToken.generated ) {
        return res.status(500).json({error: "Internal server error."});
    }

     // indicate fields to set.
    const set: VerifyEmailType = {
        emailVerificationToken: genEmailToken.hashedToken, 
        emailVerificationCode: genEmailToken.hashedCode, 
        emailverificationExpiresAt: genEmailToken.expiresAt,
        isEmailVerified: false
    }

    const storeToken = await findAndUpdate("user", {email, userId}, set )

    // Exit if generated token wasn't stored.
    if (!storeToken.updated) {
        return res.status(500).json({ error : "Internal sever error."});
    }

    const firstName = storeToken.newData.firstName;
    // Send Email to user.
    const mail = await sendVerifyEmail(firstName, email, genEmailToken.code, genEmailToken.url);

    if (!mail.sent) {
        return res.status(500).json({ error : "Internal sever error.  Please Try again later"});
    }

    return res.status(200).json({ message: "Code sent to your email."})

})

export default router;