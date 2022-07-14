import API from "."

const guardServices = {
    getGuards: () => API.get(`/guards`),
    addGuard : (guardData) => API.post(`/register/guard`,guardData),
    updateGuard : (guardId,guardData) => API.put(`/guards/${guardId}`,guardData),
    getGuard:(guardId)=> API.get(`/guards/${guardId}`),
    getAvailableGuards:(branchId,date)=>API.post(`/branch/${branchId}/guards`,{date})
}


export default guardServices