import { getDeviceId } from "./deviceId"

interface RegisterProps {
    deviceId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

export const register = async (newUser: RegisterProps) : Promise<
    |{registered: false, error: string}
    |{registered: true, data: any}> => {
        
        if (newUser.password !== newUser.confirmPassword) {
            return {registered: false, error: "Passwords do not match"};
        }

        try {
            const response = await fetch("./api/auth/register", {
                method: "POST",
                headers: {
                    "x-device-id": newUser.deviceId,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    password: newUser.password,
                    role: "buyer"
                })
            })

            const data = await response.json();
            if (!response.ok) {
                return {registered: false, error:"Internal server error"};
            }
            console.log(data);
            return {registered: true, data};

        } catch (err: any) {
            console.error(err.message, err);
            return {registered: false, error: "Internal server error"};
        }

}

export const login = async ({email, password}: {email: string, password: string}) : Promise<
    |{authorized: false, error: string}
    |{authorized: true, data: any}> => {
        try {
            const response = await fetch("./api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-device-id": `${getDeviceId()}`
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await response.json();
            if (!response.ok) {
                if (data.incorrect === "username") {
                    return {authorized: false, error:"Username incorrect try again."};
                }
                if (data.incorrect === "password") {
                    return {authorized: false, error:"Password incorrect try again."};
                }
                return {authorized: false, error:data.message};
            }
            console.log(data);
            return {authorized: true, data};

        } catch (err: any) {
            console.error(err.message, err);
            return {authorized: false, error: "Internal server error"};
        }
}


export const sendVerificationCode = async (email: string, firstName: string) : Promise<
    |{sent: false, error: string}
    |{sent: true, data: any}> => {
        
        try {
            const response = await fetch("./api/verify-email/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-device-id": `${getDeviceId()}`
                },
                body: JSON.stringify({
                    email,
                    firstName
                })
            })

            const data = await response.json();
            if (!response.ok || !data.sent ) {
                return {sent: false, error: data.error || "Internal server error"};
            }
            console.log(data);
            return {sent: true, data};

        } catch (err: any) {
            console.error(err.message, err);
            return {sent: false, error: "Internal server error"};
        }
}

export const verifyUserEmail = async ( code: string ) : Promise<
    |{verified: false, error: string}
    |{verified: true, data: any}> => {
        try {
            const response = await fetch("./api/verify-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-device-id": `${getDeviceId()}`
                },
                body: JSON.stringify({
                    code
                })
            })

            const data = await response.json();
            if (!response.ok || !data.verified ) {
                return {verified: false, error: data.error || "Internal server error"};
            }
            console.log(data);
            return {verified: true, data};

        } catch (err: any) {
            console.error(err.message, err);
            return {verified: false, error: "Internal server error"};
        }
    }