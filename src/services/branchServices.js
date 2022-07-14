import API from "."

const branchServices = {
    getBranches: (companyId) => API.get(`/company/${companyId}/branches`),
    getBranch:(branchId) => API.get(`/branch/${branchId}`),
    addBranch: (companyId,branch) => API.post(`/company/${companyId}`,branch),
    updateBranch: (branchId,branchData) => API.put(`/branch/${branchId}`,branchData),
    getAvailableGuards : (branchId) => API.get(`/branch/${branchId}/guards`)
}

export default branchServices