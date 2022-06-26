import {configureStore} from "@reduxjs/toolkit"
import logger from "redux-logger"
import userReducer from "./user"
import recoverReducer from "./recoverpassword"
import alertReducer from "./alert"

const store=configureStore({
    midelware:(getDefaultMiddleware)=>{getDefaultMiddleware().concat(logger)},
    reducer:{
        user: userReducer,
        recover : recoverReducer,
        alert : alertReducer
    }
})





export default store