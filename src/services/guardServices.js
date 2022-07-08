import axios from 'axios'
import { URL } from '../constants'

const guardServices = {
    getGuards: () => axios.get(`${URL}/guards`),
    getGuard:(guardId)=> axios.get(`${URL}/guards/${guardId}`)
}


export default guardServices