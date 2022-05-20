<template>
  <div class="preview">
    <n-image-group>
      <n-space>
        <n-popover v-for="(item, index) in images" :key="index" trigger="hover">
          <template #trigger>
            <n-image width="150" :src="item" height="150" />
          </template>
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
        </n-popover>
      </n-space>
    </n-image-group>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Delete20Regular } from '@vicons/fluent'

interface Props {
  images: Array<any>
}
const props = withDefaults(defineProps<Props>(), {
  images: () => {
    return []
  },
})
const images: any = reactive(props.images)
const deleteImage = (index: number) => {
  images.splice(index, 1)
}
</script>

<style scoped lang="less">
.preview {
  margin-top: 30px;
  width: 58%;
}
</style>
