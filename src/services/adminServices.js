import axios from 'axios'
import { URL } from '../constants'

const adminServices = {
    getAdmins: () => axios.get(`${URL}/admin`),
    addAdmin: (adminData) => axios.post(`${URL}/register/admin`,adminData),
    updateAdmin : (adminId,adminData) => axios.put(`${URL}/admin/${adminId}`,adminData)
}

export default adminServices