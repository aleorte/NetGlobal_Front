import { Route, Navigate} from 'react-router-dom'
import Login from '../views/Login'
import RecoverPassword from '../views/RecoverPassword'

const publicRoutes = [
    <Route path="/" element={<Navigate to="/login"/>}/>,
    <Route path="/login" element={<Login/>}/>,
    <Route path="/recover" element={<RecoverPassword/>}/>
]

export default publicRoutes