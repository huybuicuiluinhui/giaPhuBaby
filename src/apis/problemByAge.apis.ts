import http from "../utils/http";
const problemByAgeApi = {
  getProblems: (data:any) => http.post(`/api/problems/month`, data),
};
export default problemByAgeApi;
