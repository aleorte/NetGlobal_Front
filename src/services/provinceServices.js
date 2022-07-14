import API from "."

const provinceServices = {
    getProvinces: () => API.get(`/provinces`),
}

export default provinceServices