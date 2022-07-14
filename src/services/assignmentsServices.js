import API from "."

const AssignmentServices = {
    getAssignmentsBranch: (branchId) => API.get(`/branch/${branchId}/tasks`),
    getAssignmentsGuard: (guardId) => API.get(`/assignments?guard=${guardId}`),
    addAssignmentsGuard: (assignment) => API.post(`/assignments`,assignment),
    putAssignmentsGuard:(assignmentId,assignment)=> API.put(`/assignments/${assignmentId}`,assignment),
    deleteAssignment:(assignmentId)=>API.delete(`/assignments/${assignmentId}`)
}

export default AssignmentServices