<template>
  <div class="uploader">
    <n-grid :x-gap="12" :cols="6">
      <n-grid-item :offset="5">
        <n-select v-model:value="platform" :options="data.platforms" />
      </n-grid-item>
    </n-grid>
    <n-upload
      :on-change="onFileChange"
      :show-file-list="false"
      accept=".jpg,.jpeg,.png,.gif"
    >
      <n-upload-dragger>
        <div style="margin-bottom: 12px">
          <Img />
        </div>
        <n-text style="font-size: 16px">
          点击或者拖动图片到该区域来上传
        </n-text>
        <n-p depth="3" style="margin: 8px 0 0 0">
          请不要上传不符合法律规定的图片以及包含敏感信息的图片
        </n-p>
      </n-upload-dragger>
    </n-upload>
    <!--    底部图片预览   -->
    <upload-list
      :platform="platform"
      @uploaded="showUploaded"
      :images="images"
      :original-files="originalFiles"
    />
    <upload-info v-if="data.showUploaded" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { UPLOAD_LIMIT } from '@/constants'
import server from '@/server'
import StorageManager from "@/utils/storage";

const { api } = server
// 上传图片列表
const images: Array<ArrayBuffer> = reactive([])
const originalFiles: Array<File> = reactive([])

const platform = ref(1)
const PLATFORM_KEY = 'platform'

const storage = new StorageManager()

interface Platform {
  value: number
  label: string
}

const data = reactive({
  showUploaded: false,
  platforms: <Platform[]>[],
})


const showUploaded = () => {
  data.showUploaded = true
}

interface RemotePlatform {
  label: string
  type: number
}

const loadPlatforms = async () => {
  let platforms: Array<RemotePlatform> = []
  try{
    platforms = loadPlatformFromLocal()
    if (platforms.length !== 0) {
      data.platforms = transferPlatforms(platforms)
      return
    }
    const res: any = await api.platforms()
    if (res && res.code === 200) {
      platforms = res.data
      storage.set(PLATFORM_KEY, platforms)
      data.platforms = transferPlatforms(platforms)
    }
  } catch (e) {
    window.$message.error('获取平台列表失败')
  }
}
/**
 * 转换平台数据
 * @param platforms {Array<RemotePlatform>}
 */
const transferPlatforms = (platforms: Array<RemotePlatform>): Array<Platform> => {
  return platforms.map((item) => {
    return {
      label: item.label,
      value: item.type,
    }
  })
}

const loadPlatformFromLocal = () => {
  const platforms = storage.get(PLATFORM_KEY)
  if (platforms) {
    return JSON.parse(platforms)
  }
  return []
}

/**
 * 上传图片
 * @param option {{file: File}}
 */
const onFileChange = (option: any) => {
  // 超过限制不上传
  if (images.length >= UPLOAD_LIMIT) {
    return
  }
  originalFiles.push(option.file.file)
  const reader = new FileReader()
  reader.readAsDataURL(option.file.file)
  reader.onload = () => {
    images.push(reader.result as ArrayBuffer)
  }
}

onMounted(() => {
  loadPlatforms()
})
</script>

<style scoped lang="less">
.uploader {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
:deep(.n-upload-dragger) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 350px;
}
:deep(.n-upload-trigger) {
  width: 58%;
}
</style>
