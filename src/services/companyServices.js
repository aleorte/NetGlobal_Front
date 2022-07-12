import axios from 'axios'
import { URL } from '../constants'

const companyServices = {
    getCompanies: () => axios.get(`${URL}/company?page=1`),
    getCompany: (companyId)=>axios.get(`${URL}/company/${companyId}`),
    addCompany: (company) => axios.post(`${URL}/company`,company),
    updateCompany : (companyId,companyData) => axios.put(`${URL}/company/${companyId}`,companyData)
}

export default companyServices