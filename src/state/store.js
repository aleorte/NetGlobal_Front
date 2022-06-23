import {configStore} from "@reduxjs/toolkit"
import logger from "redux-logger"
import userReducer from "./user"

const store=configStore({
    midelware:(getDefaultMiddleware)=>{getDefaultMiddleware().concat(logger)},
    reducer:{
        user: userReducer
    }
})





export default store