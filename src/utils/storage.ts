import { TOKEN_KEY } from '@/constants'

type StorageType = 'sessionStorage' | 'localStorage'

class StorageManager {
  storage: Storage
  constructor(storageType?: StorageType) {
    switch (storageType) {
      case 'sessionStorage':
        this.storage = sessionStorage
        break
      case 'localStorage':
        this.storage = localStorage
        break
      default:
        this.storage = localStorage
        break
    }
  }

  get(key: string): string | null {
    return this.storage.getItem(key)
  }

  set(key: string, value: any) {
    this.storage.setItem(key, value)
  }

  remove(key: string) {
    this.storage.removeItem(key)
  }

  /**
   * @description 设置token
   * @param token {string} token
   */
  setToken(token: string) {
    this.set(TOKEN_KEY, token)
  }

  /**
   * @description 获取token
   */
  getToken(): string {
    return this.get(TOKEN_KEY) ?? ''
  }

  /**
   * @description remove token
   */
  clearToken() {
    this.remove(TOKEN_KEY)
  }
}

export default StorageManager
