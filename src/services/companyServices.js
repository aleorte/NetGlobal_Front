import API from "."

const companyServices = {
    getCompanies: () => API.get(`/company?page=1`),
    getCompany: (companyId)=>API.get(`/company/${companyId}`),
    addCompany: (company) => API.post(`/company`,company),
    updateCompany : (companyId,companyData) => API.put(`/company/${companyId}`,companyData)
}

export default companyServices