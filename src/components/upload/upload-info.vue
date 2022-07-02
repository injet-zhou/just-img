<template>
  <div class="upload-info">
    <n-card size="medium">
      <n-tabs type="line" animated>
        <n-tab-pane
          v-for="(item, index) in format"
          :key="index"
          :name="sentence2SnakeCase(item.label)"
          :tab="item.label"
        >
          <div v-for="(url, index) in URLs" :key="index">
            {{ item.formatter(url) }}
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from 'vue'
import useUploadStore from '@/store/upload'
const store = useUploadStore()

const URLs = reactive(store.URLs)

interface Format {
  label: string
  formatter: (value: string) => string
}

const sentence2SnakeCase = (sentence: string) => {
  return sentence.replace(/[\s-]/g, '_').toLowerCase()
}

const format: Format[] = [
  {
    label: 'URL',
    formatter: (value: string) => {
      return value
    },
  },
  {
    label: 'Markdown',
    formatter: (value: string) => {
      return `![${value}](${value})`
    },
  },
  {
    label: 'HTML',
    formatter: (value: string) => {
      return `<img src="${value}"  alt="img"/>`
    },
  },
  {
    label: 'BBCode',
    formatter: (value: string) => {
      return `[img]${value}[/img]`
    },
  },
  {
    label: 'Markdown with link',
    formatter: (value: string) => {
      const strs = value.split('/')
      const name = strs[strs.length - 1]
      return `[${name}](${value})`
    },
  },
]
</script>

<style scoped>
.upload-info {
  margin-top: 20px;
  width: 58%;
}
.url {
 display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
