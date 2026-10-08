
import { configureStore } from "@reduxjs/toolkit";
import propertySlice from "./Property/property-slice";
import propertDetailsSlice from "./PropertyDetails/propertyDetails-slice";
import userSlice from "./User/user-slice";
import bookingSlice from "./Booking/booking-slice";
import paymentSlice from "./Payment/payment-slice";
import accomodationSlice from "./Accomodation/Accomodation-slice";

const store = configureStore({
    reducer:{
        properties: propertySlice.reducer,
        propertydetails: propertDetailsSlice.reducer,
        user: userSlice.reducer,
        booking: bookingSlice.reducer,
        /////////////////////////
        payment:paymentSlice.reducer,
        accomodation:accomodationSlice.reducer
    }
})

export default store;