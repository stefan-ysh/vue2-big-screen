import { Message, MessageBox, Notification, Loading } from 'element-ui'

let loadingInstance

export default {
  // 消息提示
  msg(content) {
    Message.info({ message: content, offset: 50 })
  },
  // 错误消息
  msgError(content) {
    Message.error({ message: content, offset: 50 })
  },
  // 成功消息
  msgSuccess(content) {
    Message.success({ message: content, offset: 50 })
  },
  // 警告消息
  msgWarning(content) {
    Message.warning({ message: content, offset: 50 })
  },
  // 弹出提示
  alert(content) {
    MessageBox.alert(content, '系统提示')
  },
  // 错误提示
  alertError(content) {
    MessageBox.alert(content, '系统提示', { type: 'error' })
  },
  // 成功提示
  alertSuccess(content) {
    MessageBox.alert(content, '系统提示', { type: 'success' })
  },
  // 警告提示
  alertWarning(content) {
    MessageBox.alert(content, '系统提示', { type: 'warning' })
  },
  // 通知提示
  notify(content) {
    Notification.info(content)
  },
  // 错误通知
  notifyError(content) {
    Notification.error(content)
  },
  // 成功通知
  notifySuccess(content) {
    Notification.success(content)
  },
  // 警告通知
  notifyWarning(content) {
    Notification.warning(content)
  },
  // 确认窗体
  confirm(content) {
    return MessageBox.confirm(content, '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
  },
  // 打开遮罩层
  loading(content = '', el, spinner = 'el-icon-loading', background = 'rgba(255, 255, 255, .5)') {
    loadingInstance = Loading.service({
      target: el || document.querySelector('body'),
      lock: true,
      text: content,
      spinner,
      background
    })
    return loadingInstance
  },
  // 关闭遮罩层
  closeLoading() {
    loadingInstance.close()
  }
}
