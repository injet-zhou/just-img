<template>
<div class="upload-info">
  <n-card size="medium">
    <n-tabs type="line" animated>
      <n-tab-pane v-for="(item,index) in format" :key="index" :name="sentence2SnakeCase(item.label)" :tab="item.label">
        {{item.formatter(url)}}
      </n-tab-pane>
    </n-tabs>
  </n-card>
</div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const url = inject('url') as string

interface Format{
  label: string
  formatter: (value: string) => string
}

const sentence2SnakeCase = (sentence: string) => {
  return sentence.replace(/[\s-]/g, '_').toLowerCase()
}

const format: Format[] = [{
  label: 'URL',
  formatter: (value: string) => {
    return value
  }
},
  {
    label:'Markdown',
    formatter: (value: string) => {
      return `![${value}](${value})`
    }
  },{
    label:'HTML',
    formatter: (value: string) => {
      return `<img src="${value}"  alt="img"/>`
    },
  },
  {
    label: 'BBCode',
    formatter: (value: string) => {
      return `[img]${value}[/img]`
    }
  },
  {
    label: 'Markdown with link',
    formatter: (value: string) => {
      return `[${value}](${value})`
    }
  },
]
</script>

<style scoped>

</style>
