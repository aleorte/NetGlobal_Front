import axios from 'axios'
import { URL } from '../constants'

const companyServices = {
    getCompanies: () => axios.get(`${URL}/company?page=1`),
    addCompany: (company) => axios.post(`${URL}/company`,company),
    updateCompany : (companyId,companyData) => axios.post(`${URL}/company/${companyId}`,companyData)
}

export default companyServices