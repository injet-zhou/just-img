<template>
  <div class="preview">
    <n-image-group>
      <n-space>
        <upload-list-item
          v-for="(item, index) in images"
          :key="index"
          :image="item"
          :index="index"
          @delete="deleteImage"
          @upload="uploadImage"
        ></upload-list-item>
      </n-space>
    </n-image-group>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import server from '@/server'
import useUploadStore from '@/store/upload'
import UploadListItem from '@/components/upload/upload-list-item.vue'

const store = useUploadStore()

const api = server.api

const emit = defineEmits(['uploaded'])

interface Props {
  images: Array<any>
  originalFiles: Array<File>
  platform: number
}
const props = withDefaults(defineProps<Props>(), {
  images: () => {
    return []
  },
  originalFiles: () => {
    return []
  },
  platform: 0,
})
const images: Array<any> = reactive(props.images)
const deleteImage = async (index: number) => {
  images.splice(index, 1)
}
const uploadImage = async (index: number) => {
  const file = props.originalFiles[index]
  const formData = new FormData()
  formData.append('file', file)
  formData.append('platform', props.platform.toString())
  try {
    const res: any = await api.upload(formData)
    if (res && res.code === 200) {
      console.log(res.data)
      store.$patch((state) => {
        state.URLs.push(res.data)
      })
      window.$message.success('上传成功')
      emit('uploaded')
    }
  } catch (e) {}
}

onMounted(() => {
  window.$message = useMessage()
})
</script>

<style scoped lang="less">
.preview {
  margin-top: 30px;
  width: 58%;
}
</style>
