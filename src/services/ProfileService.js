import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class ProfileService {

  async getProfileById(profileId) {

    const res = await api.get('api/profiles/' + profileId)
    logger.log('profile by ID', res.data)
    AppState.activeProfile = res.data
  }

}

export const profileService = new ProfileService()