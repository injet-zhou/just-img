<template>
  <div class="preview">
    <n-image-group>
      <n-space>
        <n-popover v-for="(item, index) in images" :key="index" trigger="hover">
          <template #trigger>
            <n-image width="150" :src="item" height="150" />
          </template>
          <n-space>
            <n-button @click="uploadImage(index)" strong secondary circle type="success">
              <template #icon>
                <n-icon><ArrowUpload20Regular /></n-icon>
              </template>
            </n-button>
            <n-popconfirm @positive-click="deleteImage(index)">
              <template #trigger>
                <n-button strong secondary circle type="error">
                  <template #icon>
                    <n-icon><Delete20Regular /></n-icon>
                  </template>
                </n-button>
              </template>
              确认删除？
            </n-popconfirm>
          </n-space>
        </n-popover>
      </n-space>
    </n-image-group>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive,provide } from "vue";
import type { InjectionKey } from 'vue'
import { Delete20Regular, ArrowUpload20Regular } from '@vicons/fluent'
import { useMessage } from 'naive-ui'
import server from "@/server";

const api = server.api

const key = Symbol("key") as InjectionKey<string>
const emit = defineEmits(['uploaded'])

interface Props {
  images: Array<any>
  originalFiles: Array<File>,
  platform: number
}
const props = withDefaults(defineProps<Props>(), {
  images: () => {
    return []
  },
  originalFiles: () => {
    return []
  },
  platform:0
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
      provide(key, res.data)
      window.$message.success('上传成功')
      emit('uploaded')
    }
  } catch(e) {

  }
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
