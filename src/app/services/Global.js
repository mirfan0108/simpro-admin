import axios from 'axios'
import routeApi from './Router'


class Global {
    
    static Login(req) {
      return axios.post(routeApi.Login, req)
    }

    static UploadAvatar(req) {
      return axios.post(routeApi.UploadUrl, req)
    }
}

export default Global