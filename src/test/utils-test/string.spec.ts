import { base64ToArrayBuffer } from '@/utils/string'
import { expect, test } from 'vitest'

test('base64ToArrayBuffer', () => {
  const base64 = 'Zm9vYmFy'
  const arrayBuffer = base64ToArrayBuffer(base64)
  expect(arrayBuffer).toBeInstanceOf(ArrayBuffer)
  expect(arrayBuffer.byteLength).toBe(6)

  const emptyBase64 = ''
  const emptyArrayBuffer = base64ToArrayBuffer(emptyBase64)
  expect(emptyArrayBuffer).toBeInstanceOf(ArrayBuffer)
  expect(emptyArrayBuffer.byteLength).toBe(0)
})
