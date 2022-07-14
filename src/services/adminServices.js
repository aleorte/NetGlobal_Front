import API from "."

const adminServices = {
    getAdmins: () => API.get(`/admin`),
    addAdmin: (adminData) => API.post(`/register/admin`,adminData),
    updateAdmin : (adminId,adminData) => API.put(`/admin/${adminId}`,adminData)
}

export default adminServices