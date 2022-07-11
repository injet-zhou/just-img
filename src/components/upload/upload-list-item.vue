<template>
  <n-popover trigger="hover">
    <template #trigger>
      <n-image width="150" :src="images" height="150" />
    </template>
    <n-space>
      <n-button @click="uploadImage()" strong secondary circle type="success">
        <template #icon>
          <n-icon><ArrowUpload20Regular /></n-icon>
        </template>
      </n-button>
      <n-popconfirm @positive-click="deleteImage()">
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
</template>

<script setup lang="ts">
import { Delete20Regular, ArrowUpload20Regular } from '@vicons/fluent'
import useUploadStore from "@/store/upload";
import { reactive } from "vue";
const emit = defineEmits(['upload'])

const store = useUploadStore()

const images = reactive(store.images)

interface Props {
  index: number
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
})

const uploadImage = async () => {
  emit('upload', props.index)
}

const deleteImage = async () => {
    store.deleteImage(props.index)
  store.deleteFile(props.index)
  }
</script>