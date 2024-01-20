import http from "../utils/http";
const handbookApi = {
  getCateHanbook: (page: number) =>
    http.get(`/api/handbook/category?page=${page}`),
  getCateHanbookSearch: (keySearch: string) => {
    let formData = new FormData();
    formData.append("key_search", keySearch);
    return http.post(`/api/handbook/search`, formData);
  },
  getDetailHanbook: (id: number) =>
    http.get(`/api/handbook/detail-category/${id}`),
  getArticleDetail: (id: number, page: number | string) =>
    http.get(`/api/handbook/detail/${id}?page=${page}`),
};
export default handbookApi;
