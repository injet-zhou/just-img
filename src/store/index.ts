import { defineStore } from 'pinia'

const useStore = defineStore('main', {
  state: () => {
    return {
      URLs: [],
    }
  },
})

export default useStore
