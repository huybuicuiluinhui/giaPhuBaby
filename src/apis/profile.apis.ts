import { BabyInfo, HealthyBaby, UserProfile } from "./../types/baby.type";
import http from "../utils/http";
import { SuccessResponse } from "../types/utils.type";
const profileApi = {
  getListBaby: () => http.get<SuccessResponse<UserProfile>>(`/api/userProfile`),
  getHealthy: (id: number) =>
    http.get<SuccessResponse<HealthyBaby>>(
      `http://103.226.249.30:8001/api/healths/${id}`
    ),
  getHealthRecord: (formData:any) =>
    http.post(`/api/milestones/health-records`, formData),
  getListMilestone: (id:any) => http.get(`/api/milestones/list-milestone/${id}`),
  getProductRecommend: () => http.get(`/api/product-recommended`),
  getBabyHealth: (formData:any) =>
    http.post(`/api/health-index/weight-height`, formData),
  getWHO: (formData:any) =>
    http.post(`/api/health-index/weight-height-who`, formData),
  checkFollow: (formData:any) => http.post(`/api/follow-zalo`, formData),
  savefollowOA: (formData:any) => http.post(`/api/add/follow-zalo`, formData),
  addMilestonWithMonthBaby: (formData:any) => {
    return http.post("/api/milestones/add-milestones-by-month", formData);
  },
};
export default profileApi;
