<template>
  <div class="uploader">
    <div class="toolbar">
      <n-grid :x-gap="5" :cols="6">
        <n-grid-item>
          <n-select v-model:value="platform" :options="data.platforms" />
        </n-grid-item>
        <n-grid-item v-if="images.length > 3">
          <n-button strong secondary type="primary"> 一键上传 </n-button>
        </n-grid-item>
      </n-grid>
    </div>
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
    <upload-list :platform="platform" @uploaded="showUploaded" />
    <upload-info v-if="data.showUploaded" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { UPLOAD_LIMIT } from '@/constants'
import server from '@/server'
import StorageManager from '@/utils/storage'
import useUploadStore from '@/store/upload'

const store = useUploadStore()
const images: Array<ArrayBuffer> = reactive(store.images)

const { api } = server

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
  try {
    platforms = loadPlatformFromLocal()
    if (platforms.length !== 0) {
      // 如果本地有存储的平台，则直接使用本地的平台
      data.platforms = transferPlatforms(platforms)
      return
    }
    const res: any = await api.platforms()
    if (res && res.code === 200) {
      platforms = res.data
      storage.set(PLATFORM_KEY, JSON.stringify(platforms))
      data.platforms = transferPlatforms(platforms)
    }
  } catch (e: any) {
    const msg = e?.message as string
    window.$message.error('获取平台列表失败: ' + msg)
  }
}
/**
 * 转换平台数据
 * @param platforms {Array<RemotePlatform>}
 */
const transferPlatforms = (
  platforms: Array<RemotePlatform>
): Array<Platform> => {
  return platforms.map((item) => {
    return {
      label: item.label,
      value: item.type,
    }
  })
}

// 加载本地平台数据
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
  if (store.images.length >= UPLOAD_LIMIT) {
    return
  }
  store.files.push(option.file.file)
  const reader = new FileReader()
  reader.readAsDataURL(option.file.file)
  reader.onload = () => {
    store.images.push(reader.result as ArrayBuffer)
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
  padding-top: 15px;
}
:deep(.n-upload-dragger) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 350px;
}
:deep(.n-upload-trigger),
.toolbar {
  width: 58%;
}
.toolbar {
  margin-bottom: 12px;
}
</style>
