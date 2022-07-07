import img from './img'
import { base64ToArrayBuffer } from '@/utils/string'
import { mount } from '@vue/test-utils'
import UploadListItem from '@/components/upload/upload-list-item.vue'
import { expect, test } from 'vitest'

test('upload-list-item', async () => {
  const wrapper = mount(UploadListItem, {
    props: {
      index: 1,
      image: base64ToArrayBuffer(img),
    },
  })
  expect(wrapper.find('img').exists()).toBe(true)
  const src = wrapper.find('img').attributes('src')
  expect(src).toBeTruthy()
})
