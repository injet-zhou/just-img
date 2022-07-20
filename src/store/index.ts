import { defineStore } from 'pinia'

const useStore = defineStore('main', {
  state: () => {
    return {
      currentMenu: '',
    }
  },
})

export default useStore
