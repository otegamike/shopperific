// types
import { type GuestInterface } from "../types/guestInterface.js";

// models
import Guest from "../models/Guest.js";

type ServiceResponse<T> = T | null;

const createGuest = async (deviceId: string): Promise<ServiceResponse<GuestInterface>> => {
    try {
        const newGuest = new Guest({
            deviceId,
            cartId: null,
        });
        await newGuest.save();
        return newGuest;
    } catch (error) {
        console.error("Error creating guest:", error);
        return null;
    }
}

const getGuest = async (deviceId: string): Promise<ServiceResponse<GuestInterface>> => {
    try {
        const guest = await Guest.findOne({ deviceId });
        if (!guest) {
            console.error("Guest not found");
            return null;
        }

        return guest;
    } catch (error) {
        console.error("Error getting guest:", error);
        return null;
    }
}

const createGuestCart = async (deviceId: string, cartId: string): Promise<ServiceResponse<GuestInterface>> => {
    try {
        const guest = await Guest.findOneAndUpdate(
            { deviceId },
            { cartId },
            { new: true }
        );

        if (!guest) return null;
        return guest;
    } catch (error) {
        console.error("Error creating guest cart:", error);
        return null;
    }
}

const deleteGuest = async (deviceId: string): Promise<ServiceResponse<GuestInterface>> => {
    try {
        const guest = await Guest.findOneAndDelete({ deviceId });

        if (!guest) {
            console.error("Guest not found");
            return null;
        }

        return guest;
    } catch (error) {
        console.error("Error deleting guest:", error);
        return null;
    }
}

export { createGuest, getGuest, createGuestCart, deleteGuest };