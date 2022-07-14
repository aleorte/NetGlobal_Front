import axios from 'axios'
import { URL } from '../constants'

const inactiveServices = {
    getPending: () => axios.get(`${URL}/inactivities/pending`),
    getPast: () => axios.get(`${URL}/inactivities/state`),
    setInactive: (inactiveId,state) => axios.put(`${URL}/inactivities/${inactiveId}`,{state}),
    getGuardInactives:(guardId)=>axios.get(`${URL}/inactivities?guard=${guardId}`)
}

export default inactiveServices