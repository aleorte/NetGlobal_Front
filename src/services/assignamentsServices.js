import axios from 'axios'
import { URL } from '../constants'

const AssignamentServices = {
    getAssignamentsBranch: () => axios.get(`${URL}/branch/id/tasks`),
    getMonthAssignamentsGuard: () => axios.get(`${URL}/assignaments?guard=1`),
    addAssignamentsGuard: (assignament) => axios.post(`${URL}/assignaments`,assignament)
}

export default AssignamentServices