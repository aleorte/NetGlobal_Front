import axios from 'axios'
import { URL } from '../constants'

const userServices = {
    logIn: (email,password)=> axios.post(`${URL}/login`,{email,password}),
    sendMailRecover: (email) => axios.post(`${URL}/admin/forgot-password`,{email}),
    sendCodeRecover: (email,code) => axios.post(`${URL}/admin/token`,{email:email,recoveryKey:code}),
    sendPasswordRecover: (email,code,password) => axios.put(`${URL}/admin/new-password`,{email,recoveryKey:code,password})
}

export default userServices