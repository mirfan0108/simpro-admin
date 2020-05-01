
import axios from 'axios'
import routeApi from './Router'


class Super {
    
    static CountStatus() {
      return axios.get(routeApi.Super_TotalStatus)
    }

    static GetList_MKS(page = 1, limit = 10, search = "") {
      return axios.get(`${routeApi.Super_ListMks}?page=${page}&limit=${limit}&search=${search}`)
    }

    static GetAll_Admin() {
      return axios.get(routeApi.Super_AllAdmin)
    }

    static Create_MKS(req) {
      return axios.post(routeApi.Super_CreateMKS, req)
    }

    static GetOne_MKS(id) {
      return axios.get(routeApi.Super_GetOneMks+"/"+id)
    }

    static Modify_MKS(id, req) {
      return axios.put(routeApi.Super_ModifyMks+"/"+id, req)
    }

}

export default Super