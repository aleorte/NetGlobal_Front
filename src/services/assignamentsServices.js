import axios from 'axios'
import { URL } from '../constants'

const AssignamentServices = {
    getAssignamentsBranch: (branchId) => axios.get(`${URL}/branch/${branchId}/tasks`),
    getMonthAssignamentsGuard: () => axios.get(`${URL}/assignaments?guard=1`),
    addAssignamentsGuard: (assignament) => axios.post(`${URL}/assignaments`,assignament)
}

export default AssignamentServices