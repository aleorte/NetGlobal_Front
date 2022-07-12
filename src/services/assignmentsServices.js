import axios from 'axios'
import { URL } from '../constants'

const AssignmentServices = {
    getAssignmentsBranch: (branchId) => axios.get(`${URL}/branch/${branchId}/tasks`),
    getAssignmentsGuard: (guardId) => axios.get(`${URL}/assignments?guard=${guardId}`),
    addAssignmentsGuard: (assignment) => axios.post(`${URL}/assignments`,assignment),
    putAssignmentsGuard:(assignmentId,assignment)=> axios.put(`${URL}/assignments/${assignmentId}`,assignment),
    deleteAssignment:(assignmentId)=>axios.delete(`${URL}/assignments/${assignmentId}`)
}

export default AssignmentServices