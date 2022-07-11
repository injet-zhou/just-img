import { defineStore } from "pinia"

interface UploadState {
    URLs: string[],
    images: ArrayBuffer[],
    files: File[],
}

const useUploadStore = defineStore('upload',{
    state: () => {
        const URLs: string[] = []
        const images: ArrayBuffer[] = []
        const files: File[] = []
        const uploadState: UploadState = {
            URLs,
            images,
            files
        }
        return uploadState
    },
    actions: {
        addImage(image: ArrayBuffer) {
            this.images.push(image)
        },
        addFile(file: File) {
            this.files.push(file)
        },
        deleteImage(index: number) {
            this.images.splice(index, 1)
            this.files.splice(index, 1)
        },
        deleteFile(index: number) {
            this.files.splice(index, 1)
        }
    }
})

export default useUploadStore