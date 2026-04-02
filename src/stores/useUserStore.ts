import { defineStore } from "pinia";
import { ref } from 'vue'
import { User } from '@/types/user'

export const useUserStore = defineStore('userStore', () => {
    const user = ref<User>({ name: '', emoji: '' })
    let isLoaded = ref<Boolean>(false)

    const loadUser = () => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            let data = JSON.parse(storedUser)
            user.value.name = data.name
            user.value.emoji = data.emoji
            isLoaded.value = true
        }
    }

    const saveUser = (name: String, emoji: String) => {
        user.value.name = name
        user.value.emoji = emoji

        localStorage.setItem('user', JSON.stringify(user.value))
    }

    const resetUser = () => {
        user.value.name = ''
        user.value.emoji = ''

        localStorage.removeItem('user')

    }

    const hasUser = () => !user.value.name


    return {
        user,
        isLoaded,
        saveUser,
        loadUser,
        hasUser,
        resetUser
    }
})