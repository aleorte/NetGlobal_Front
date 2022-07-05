import {configureStore} from "@reduxjs/toolkit"
import logger from "redux-logger"
import userReducer from "./user"
import recoverReducer from "./recoverpassword"
import alertReducer from "./alert"
import companyReducer from "./company"
import guardsReducer from "./guards"
import adminReducer from "./admin"

const store=configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger),
    reducer:{
        user: userReducer,
        recover : recoverReducer,
        alert : alertReducer,
        company: companyReducer,
        guard: guardsReducer,
        admin: adminReducer
    }
})





export default store