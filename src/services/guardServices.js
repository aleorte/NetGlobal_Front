import axios from 'axios'
import { URL } from '../constants'

const guardServices = {
    getGuards: () => axios.get(`${URL}/guards`),
    addGuard : (guardData) => axios.post(`${URL}/register/guard`,guardData)
}

export default guardServices