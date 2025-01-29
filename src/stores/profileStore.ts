import { defineStore } from 'pinia'
import {useAPI} from "~/composables/useAPI";
import Profile from "~/utils/Profile";

interface ProfileAPIResponse {
    profiles: Profile[]
}
export const useProfileStore = defineStore('profile', () => {
    const profiles = ref<Profile[]>([])
    const current_profile = ref<Profile | null>(null)

    const fetchProfile = async () => {
        const profilesResponse = await useAPI('/api/profiles') as ProfileAPIResponse
        console.log(profilesResponse.profiles);
        profiles.value = profilesResponse.profiles.map((profile) => new Profile(profile.id, profile.user_id, profile.background, profile.avatar, profile.bio, profile.created_at, profile.updated_at));
        current_profile.value = profiles.value[0]
    }

    return {
        profiles,
        current_profile,
        fetchProfile,
    }
})

