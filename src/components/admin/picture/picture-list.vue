<template>
  <div class="pic-list">
    <n-data-table :columns="columns" :data="data" :pagination="paginationReactive" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import server from '@/server';

const { api } = server;

const columns = [
  {
    title: '文件名',
    key: 'originalName'
  },
  {
    title: '大小',
    key: 'size'
  },
  {
    title: '路径',
    key: 'path'
  },
  {
    title: 'URL',
    key: 'url'
  },
  {
    title: '上传用户',
    key: 'username'
  }
]



const data: Array<any> = reactive([])

const pagination = reactive({
  page: 1,
  pageSize: 20,
})
const paginationReactive = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onChange: (page: number) => {
    paginationReactive.page = page
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    paginationReactive.pageSize = pageSize
    paginationReactive.page = 1
    pagination.page = 1
    pagination.pageSize = pageSize
  }
})

const getImages = async () => {
  const req = {
    page: pagination.page,
    pageSize: pagination.pageSize
  }
  const res: any = await api.imageList(req)
  if (res.code === 200) {
    data.splice(0, data.length)
    data.push(...res.data)
  }
}

onMounted(() => {
  getImages()
})
</script>

