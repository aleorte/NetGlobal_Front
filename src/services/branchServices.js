import axios from 'axios'
import { URL } from '../constants'

const branchServices = {
    getBranches: (companyId) => axios.get(`${URL}/company/${companyId}/branches`),
    getBranch:(branchId) => axios.get(`${URL}/branch/${branchId}`),
    addBranch: (companyId,branch) => axios.post(`${URL}/company/${companyId}`,branch),
    updateBranch: (branchId,branchData) => axios.put(`${URL}/branch/${branchId}`,branchData),
    getAvailableGuards : (branchId) => axios.get(`${URL}/branch/${branchId}/guards`)
}

export default branchServices