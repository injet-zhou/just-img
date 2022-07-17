<template>
  <n-message-provider>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        :default-value="'dashboard'"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :expand-icon="expandIcon"
        />
      </n-layout-sider>
      <n-layout>
        <n-layout-header>颐和园路</n-layout-header>
        <n-layout-content content-style="padding: 24px;">
          <router-view />
        </n-layout-content>
        <basic-footer />
      </n-layout>
    </n-layout>
  </n-message-provider>
</template>

<script setup lang="ts">
import { h, ref, Component } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  CaretDown20Filled,
  AirplaneTakeOff20Regular,
  Settings20Filled,
  Image20Regular,
  ImageSearch20Regular,
  ImageAltText20Regular,
  PersonSettings20Filled,
  Storage24Regular,
  AttachArrowRight20Filled,
  FlashSettings20Filled,
} from '@vicons/fluent'
import { RouterLink } from 'vue-router'

const collapsed = ref(false)

const menuOptions: MenuOption[] = [
  {
    label: () => {
      return h(
        RouterLink,
        { to: { name: 'admin_home' } },
        {
          default: () => '控制台',
        }
      )
    },
    key: 'dashboard',
    icon: renderIcon(AirplaneTakeOff20Regular),
  },
  {
    label: '图片管理',
    key: 'picture',
    icon: renderIcon(Image20Regular),
    children: [
      {
        label: () => {
          return h(
            RouterLink,
            { to: { name: 'admin_picture_list' } },
            {
              default: () => '相册',
            }
          )
        },
        key: 'album',
        icon: renderIcon(ImageSearch20Regular),
      },
      {
        label: () => {
          return h(
            RouterLink,
            { to: { name: 'admin_picture_list' } },
            {
              default: () => '图片列表',
            }
          )
        },
        key: 'pic-list',
        icon: renderIcon(ImageAltText20Regular),
      },
    ],
  },
  {
    label: '用户管理',
    key: 'user',
    icon: renderIcon(PersonSettings20Filled),
  },
  {
    label: '设置',
    key: 'settings',
    icon: renderIcon(Settings20Filled),
    children: [
      {
        label: '存储设置',
        key: 'storage-settings',
        icon: renderIcon(Storage24Regular),
      },
      {
        label: '上传设置',
        key: 'upload-settings',
        icon: renderIcon(AttachArrowRight20Filled),
      },
      {
        label: '系统设置',
        key: 'sys-settings',
        icon: renderIcon(FlashSettings20Filled),
      },
    ],
  },
]

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const expandIcon = () => {
  return h(NIcon, null, { default: () => h(CaretDown20Filled) })
}
</script>

<style scoped lang="scss">
.n-layout {
  height: 100%;
}
</style>
