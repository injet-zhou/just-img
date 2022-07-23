<template>
  <div class="user-list">
    <n-grid :x-gap="12" :y-gap="8" :cols="4">
      <n-grid-item>
        <n-input-group>
          <n-input type="text" v-model="search.username" placeholder="用户名" clearable />
          <n-button type="primary" ghost>
            <template #icon>
              <n-icon><search20-filled /></n-icon>
            </template>
          </n-button>
        </n-input-group>
      </n-grid-item>
    </n-grid>
    <n-data-table :columns="columns" :data="users" :pagination="paginationReactive" />
  </div>
</template>

<script setup lang="ts">
import { Search20Filled } from "@vicons/fluent";
import { onMounted, reactive } from "vue";
import server from "@/server";

const search = reactive({
  nickname: '',
  username: '',
  groupName: '',
  email: '',
  uid: '',
  createdAtStart: '',
  createdAtEnd: '',
})

const { api } = server;
const columns = [
  {
    title: '用户ID',
    key: 'ID'
  },
  {
    title: '用户名',
    key: 'username'
  },
  {
    title: 'email',
    key: 'email'
  },
  {
    title: '昵称',
    key: 'nickname'
  },
  {
    title: '群组',
    key: 'groupName'
  },
]

const users: Array<any> = reactive([])

const pagination = reactive({
  page: 1,
  pageSize: 20,
})

const getUsers = async () => {
  const req = {
    page: pagination.page,
    limit: pagination.pageSize,
    ...search
  }
  const res: any = await api.userList(req);
  if (res.code === 200) {
    const {data} = res
    if (data) {
      const {totalPages, totalRows,rows} = data
      users.splice(0, users.length, ...rows)
    }
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
    getUsers()
  },
  onUpdatePageSize: (pageSize: number) => {
    paginationReactive.pageSize = pageSize
    paginationReactive.page = 1
    pagination.page = 1
    pagination.pageSize = pageSize
    getUsers()
  }
})

onMounted(() => {
  getUsers()
})
</script>

<style lang="scss" scoped>
.n-grid {
  box-sizing: border-box;
  padding-bottom: 10px;
}
</style>
