import axios from 'axios'
import { URL } from '../constants'

const userServices = {
    logIn: (email,password)=> axios.post(`${URL}/login`,{email,password}),
    sendMailRecover: (email) => axios.post(`${URL}/mailrecover`,{email}),
    sendCodeRecover: (email,code) => axios.post(`${URL}/coderecover`,{email,code}),
    sendPasswordRecover: (email,code,password) => axios.post(`${URL}/passwordrecover`,{email,code,password})
}

export default userServices