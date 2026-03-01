import { Router } from "express";

// services
import { getUserById } from "../../services/user.js";
import { getCart } from "../../services/cart.js";

// types
import type { Request } from "express";
import type { TypedResponse } from "../../utils/types/utilTypes.js";
import type { tResponseError } from "../../types/routesInterface.js";
import type { ClientUser } from "../../types/authenticationInterface.js";
import type { CartItem } from "../../types/cartInterface.js";

const router = Router();

type tValidateErrorResponse = tResponseError & {validated: false};
type tValidateSuccessResponse = {message: string, user: ClientUser, cart: CartItem[] | null};

router.post("/validate", async (req: Request, res: TypedResponse<tValidateSuccessResponse | tValidateErrorResponse>) => {
    const user = req.user;

    if (!user) {
        console.log("Unauthorized Couldn't verify user new");
        res.status(401).json({ errorMsg: "Unauthorized", validated: false });
        return;
    }

    const { userId, email, role } = user;
    let firstName: string = "Guest";

    if (role !== "guest" && user.validated) {
        const userDoc = await getUserById(userId);
        if (userDoc) {
            firstName = userDoc.firstName;
        }
    }

    const cartId = user.cartId;
    let cart: CartItem[] | null = null;
    if ( cartId ) {
        const userCart = await getCart(cartId);
        if (userCart) {
            cart = userCart.items;
        }
    }
    
    res.json({ message: "User is valid", user: { firstName, email, role }, cart });
});

export default router;