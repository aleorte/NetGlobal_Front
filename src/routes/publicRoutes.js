import { Route, Navigate} from 'react-router-dom'
import Login from '../views/Login'
import RecoverPassword from '../views/RecoverPassword'

const publicRoutes = [
    <Route key="init" path="/" element={<Navigate to="/login"/>}/>,
    <Route key="login" path="/login" element={<Login/>}/>,
    <Route key="recover" path="/recover" element={<RecoverPassword/>}/>
]

export default publicRoutes