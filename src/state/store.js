import {configureStore} from "@reduxjs/toolkit"
import logger from "redux-logger"
import userReducer from "./user"
import recoverReducer from "./recoverpassword"
import alertReducer from "./alert"
import companyReducer from "./company"
import guardsReducer from "./guards"
import adminReducer from "./admin"
import assignamentReducer from "./assignamentState"

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
        admin: adminReducer,
        branchAssignament:assignamentReducer,
    }
})





export default store