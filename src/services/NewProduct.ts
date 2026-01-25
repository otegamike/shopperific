// services
import { getDeviceId } from './deviceId'

//types
import type { NewProductDataType } from '../types/productInterface/productInterface'

export const AddNewProduct = async (product: NewProductDataType) : 
Promise<
|{newProduct: any , message: string} 
| {errormsg: string}> => {



  try {
    const response = await fetch("/api/products/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-device-id": getDeviceId()
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    if (!response.ok || response.status !== 201 || !data || "error" in data) {
      throw new Error("Failed to add product" + data.error? data.error : "");
    }
    return {newProduct: data.product , message: data.message}
    
  } catch (error) {
    console.error(error);
    return {errormsg: error as string };
  }
};