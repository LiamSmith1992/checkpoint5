import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class AddsService {

  async getAdds() {
    const res = await api.get('api/ads')
    logger.log('ads', res.data)
    AppState.adds = res.data
    logger.log('appstate adds', AppState.adds)
  }

}


export const addsService = new AddsService()