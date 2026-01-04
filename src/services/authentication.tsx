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