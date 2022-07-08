import axios from 'axios'
import { URL } from '../constants'

const provinceServices = {
    getProvinces: () => axios.get(`${URL}/provinces`),
}

export default provinceServices