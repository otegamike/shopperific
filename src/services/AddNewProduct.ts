// services
import { getDeviceId } from './deviceId'

export const AddNewProduct = async (FormData: FormData) : 
Promise<
|{newProduct: any , message: string} 
| {errormsg: string}> => {



  try {
    const response = await fetch("/api/products/new", {
      method: "POST",
      headers: {
        "x-device-id": getDeviceId()
      },
      body: FormData,
    });
    
    console.log(getDeviceId());

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