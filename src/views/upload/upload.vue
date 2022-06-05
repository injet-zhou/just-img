<template>
  <div class="uploader">
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
    <PreviewList :images="images" :original-files="originalFiles" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { UPLOAD_LIMIT } from '@/constants'
// 上传图片列表
const images: Array<any> = reactive([])
const originalFiles: Array<File> = reactive([])
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
    images.push(reader.result)
  }
}
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
