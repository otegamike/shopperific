
// api
import api from '../api/client';

// utils
import { alertObj } from '../utils/alerts/alert';

export const AddNewProduct = async (FormData: FormData) => {
// Promise<
// |{newProduct: any , message: string} 
// | {errormsg: string}> 




  try {
    const response = await api.post("/products/new", FormData);

    alertObj(response.data.message, "success");
    // return {newProduct: response.data.product , message: response.data.message}
   } catch (error) {
    console.error(error);
    // return {errormsg: error as string };
   }   
};

// const response = await fetch("/api/products/new", {
//       method: "POST",
//       headers: {
//         "x-device-id": getDeviceId()
//       },
//       body: FormData,
//     });
    
//     console.log(getDeviceId());

//     const data = await response.json();
//     if (!response.ok || response.status !== 201 || !data || "error" in data) {
//       throw new Error("Failed to add product" + data.error? data.error : "");
//     }
//     return {newProduct: data.product , message: data.message}
    
//   } catch (error) {
//     console.error(error);
//     return {errormsg: error as string };
//   }