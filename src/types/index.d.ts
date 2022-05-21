import { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'

export {}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    $message: MessageApiInjection
  }
}
