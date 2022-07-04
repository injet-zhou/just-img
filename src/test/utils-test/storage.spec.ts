import { it, describe, expect } from 'vitest'
import StorageManager from '@/utils/storage'

describe('storage', () => {
  const key = 'test'
  const value = 'test'
  const s = new StorageManager()
  it('set', () => {
    s.set(key, value)
    expect(s.get(key)).toBe(value)
  })

  it('remove', () => {
    s.remove(key)
    expect(s.get(key)).toBe(null)
  })

  it('setToken', () => {
    s.setToken(value)
    expect(s.getToken()).toBe(value)
  })

  it('clearToken', () => {
    s.clearToken()
    expect(s.getToken()).toBe('')
  })

  it('getToken', () => {
    s.setToken(value)
    expect(s.getToken()).toBe(value)
  })

  it('get', () => {
    s.set(key, value)
    expect(s.get(key)).toBe(value)
  })

  it('remove', () => {
    s.remove(key)
    expect(s.get(key)).toBe(null)
  })

  const key2 = 'test2'
  const value2 = 'test2'
  const s2 = new StorageManager('sessionStorage')
  it('set', () => {
    s2.set(key2, value2)
    expect(s2.get(key2)).toBe(value2)
  })

  it('remove', () => {
    s2.remove(key2)
    expect(s2.get(key2)).toBe(null)
  })

  it('setToken', () => {
    s2.setToken(value2)
    expect(s2.getToken()).toBe(value2)
  })

  it('clearToken', () => {
    s2.clearToken()
    expect(s2.getToken()).toBe('')
  })

  it('getToken', () => {
    s2.setToken(value2)
    expect(s2.getToken()).toBe(value2)
  })

  it('get', () => {
    s2.set(key2, value2)
    expect(s2.get(key2)).toBe(value2)
  })
})
