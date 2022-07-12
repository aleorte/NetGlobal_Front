import {configureStore} from "@reduxjs/toolkit"
import logger from "redux-logger"
import userReducer from "./user"
import recoverReducer from "./recoverpassword"
import alertReducer from "./alert"
import companyReducer from "./company"
import guardsReducer from "./guards"
import adminReducer from "./admin"
import provincesReducer from "./provinces"
import branchReducer from "./branch"
import assignmentReducer from "./assignmentState"

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
        province: provincesReducer,
        branch: branchReducer,
        branchAssignment:assignmentReducer,

    }
})





export default store