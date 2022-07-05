import axios from 'axios'
import { URL } from '../constants'

const guardServices = {
    getGuards: () => axios.get(`${URL}/guards`),
}

export default guardServices