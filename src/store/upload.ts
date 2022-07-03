import { defineStore } from "pinia"

interface UploadState {
    URLs: string[]
}

const useUploadStore = defineStore('upload',{
    state: () => {
        const URLs: string[] = []
        const uploadState: UploadState = {
            URLs
        }
        return uploadState
    }
})

export default useUploadStore