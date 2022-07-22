<template>
  <div class="pic-list">
    <n-grid :x-gap="12" :y-gap="8" :cols="4">
      <n-grid-item>
        <n-input-group>
          <n-input type="text" v-model="search.originalName" placeholder="图片名称" clearable />
          <n-button type="primary" ghost>
            <template #icon>
              <n-icon><search20-filled /></n-icon>
            </template>
          </n-button>
        </n-input-group>
      </n-grid-item>
    </n-grid>
    <n-data-table :columns="columns" :data="data" :pagination="paginationReactive" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import server from '@/server';
import { Search20Filled } from "@vicons/fluent";

const search = reactive({
  originalName: '', // 文件名称
  username: '', // 搜索用户名
  groupName: '', // 群组名称
  uploadIP: '', // 上传者IP
})

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
  },
  {
    title: '上传IP',
    key: 'uploadIP'
  }
]


const data: Array<any> = reactive([])

const pagination = reactive({
  page: 1,
  pageSize: 20,
})

const getImages = async () => {
  const req = {
    page: pagination.page,
    limit: pagination.pageSize,
    ...search
  }
  const res: any = await api.imageList(req)
  if (res.code === 200) {
    data.splice(0, data.length)
    data.push(...res.data)
  }
}

const paginationReactive = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onChange: (page: number) => {
    paginationReactive.page = page
    pagination.page = page
    getImages()
  },
  onUpdatePageSize: (pageSize: number) => {
    paginationReactive.pageSize = pageSize
    paginationReactive.page = 1
    pagination.page = 1
    pagination.pageSize = pageSize
    getImages()
  }
})

onMounted(() => {
  getImages()
})
</script>

<style lang="scss" scoped>
.n-grid {
  box-sizing: border-box;
  padding-bottom: 10px;
}
</style>

