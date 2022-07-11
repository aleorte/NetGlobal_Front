import axios from 'axios'
import { URL } from '../constants'

const branchServices = {
    getBranches: (companyId) => axios.get(`${URL}/company/${companyId}/branches`),
    addBranch: (companyId,branch) => axios.post(`${URL}/company/${companyId}`,branch),
    updateBranch: (branchId,branchData) => axios.put(`${URL}/branch/${branchId}`,branchData)
}

export default branchServices