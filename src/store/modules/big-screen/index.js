// 大屏设计器状态存储

// 公用
import {
  commonState,
  commonActions,
  commonMutations,
  commonGetters
} from './common'
// 设计时
import {
  designState,
  designActions,
  designMutations,
  designGetters
} from './design'

// 预览时/运行时
import {
  previewState,
  previewActions,
  previewMutations,
  previewGetters
} from './preview'

const state = {
  ...commonState,
  ...designState,
  ...previewState
}
const actions = {
  ...commonActions,
  ...designActions,
  ...previewActions
}
const mutations = {
  ...commonMutations,
  ...designMutations,
  ...previewMutations

}
const getters = {
  ...commonGetters,
  ...designGetters,
  ...previewGetters
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
