
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
