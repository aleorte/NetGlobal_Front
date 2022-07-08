import axios from 'axios'
import { URL } from '../constants'

const branchServices = {
    getBranches: (companyId) => axios.get(`${URL}/company/${companyId}/branches`),
}

export default branchServices