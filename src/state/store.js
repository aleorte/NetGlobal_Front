import {configureStore} from "@reduxjs/toolkit"
import logger from "redux-logger"
import userReducer from "./user"
import recoverReducer from "./recoverpassword"

const store=configureStore({
    midelware:(getDefaultMiddleware)=>{getDefaultMiddleware().concat(logger)},
    reducer:{
        user: userReducer,
        recover:recoverReducer
    }
})





export default store