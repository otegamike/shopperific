import crypto from "crypto"

export const hashToken = (token: string )
: |{ hashed: true, hashedToken?: string }
  |{ hashed: false } => {

    try {
        const hashedToken = crypto
                    .createHash("sha256")
                    .update(token)
                    .digest("hex");
        
        return { hashed: true, hashedToken }
    } catch (err: any) {
        return { hashed: false }
    }
}

export const genToken = () : 
    |{ generated: true, token: string, hashedToken: string, code: string, hashedCode: string, url: string, expiresAt: number } 
    |{ generated: false }=> {
    
    console.log("Generating Email Token...")

        try {
            const verificationToken = crypto.randomBytes(32).toString("hex");
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

            const hashedToken = crypto
                .createHash("sha256")
                .update(verificationToken)
                .digest("hex");

            const hashedCode = crypto
                .createHash("sha256")
                .update(verificationCode)
                .digest("hex");

            const expiresAt =  Date.now() + 1000 * 60 * 60;

            const url = verifyurl(verificationToken);

            return { 
                generated: true, 
                token: verificationToken, 
                code: verificationCode, 
                hashedCode, 
                hashedToken, 
                url, 
                expiresAt }

        } catch (err: any) {
            console.error("Error generating email Token",err.message, err)
            return { generated: false }
        }

}

export const verifyurl = ( token : string ): string => {
    console.log("Generating Email url...")
    // return `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;
    return `http://localhost:8888/api/auth/verify-email?token=${token}`;
}

