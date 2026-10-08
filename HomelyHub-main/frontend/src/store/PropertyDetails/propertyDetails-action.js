import{propertyDetailsAction} from"./propertyDetails-slice";
import{axiosInstance} from "../../utils/axios"

export const getPropertyDetails = (id)=> async(dispatch)=>{
    try{
        dispatch(propertyDetailsAction.getListRequest());
        const response = await axiosInstance(`/v1/rent/listing/${id}`);
        console.log(response);
        if(!response){
            throw new Error("could not fetch any propertyDetails")
        }
        const data = response.data.data;
        dispatch(propertyDetailsAction.getPropertyDetails(data))

    }catch(error){
        dispatch(propertyDetailsAction.getErrors(error.response.data.error))

    }
}