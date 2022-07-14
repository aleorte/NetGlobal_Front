import API from "."

const inactiveServices = {
    getPending: () => API.get(`/inactivities/pending`),
    getPast: () => API.get(`/inactivities/state`),
    setInactive: (inactiveId,state) => API.put(`/inactivities/${inactiveId}`,{state})
}

export default inactiveServices