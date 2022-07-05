import axios from 'axios'
import { URL } from '../constants'

const adminServices = {
    getAdmins: () => axios.get(`${URL}/admin`),
}

export default adminServices