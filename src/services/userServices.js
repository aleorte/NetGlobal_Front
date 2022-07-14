import API from "."

const userServices = {
    logIn: (email,password)=> API.post(`/login`,{email,password}),
    sendMailRecover: (email) => API.post(`/admin/forgot-password`,{email}),
    sendCodeRecover: (email,code) => API.post(`/admin/token`,{email:email,recoveryKey:code}),
    sendPasswordRecover: (email,code,password) => API.put(`/admin/recover/new-password`,{email,recoveryKey:code,password})
}

export default userServices