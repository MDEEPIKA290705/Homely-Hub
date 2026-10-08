import { propertyAction } from "./property-slice";
import { axiosInstance } from "../../utils/axios";
//get all properties
//start api req
//tell redux loading statrted
// get search paramters
// call backend api
// wait for response
// Get property DataTransfersend data to redux Store 
// if error=>send error to redux


export const getAllProperties = () => async (dispatch, getState) => {
    try {
        console.log("API call started");
        dispatch(propertyAction.getRequest());

        const { searchParams = {} } = getState().properties || {};
        console.log(searchParams);

        const response = await axiosInstance.get('/v1/rent/listing', {
            params: { ...searchParams }
        });

        if (!response) {
            throw new Error("could not fetch any properties");
        }

        const { data } = response;
        console.log(data);
        dispatch(propertyAction.getPrpoerties(data));
    } catch (error) {
        dispatch(propertyAction.getErrors(error?.response?.data?.message || error.message));
    }
};