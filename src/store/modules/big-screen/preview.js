// 大屏设计器预览/运行时数据状态
const previewState = {
  reqParams: {},
  viewData: {}
}
const previewActions = {
  initViewBigScreenData({ state }, data) {
    state.viewData = data
  },
  // 更改参数
  changeReqParams({ commit }, data) {
    commit('CHANGE_REQ_PARAMS', data)
  },
  // 更该组件显隐
  changeCptHiddenStatus({ commit }, data) {
    commit('CHANGE_CPT_HIDDEN_STATUS', data)
  }
}
const previewMutations = {
  CHANGE_CPT_HIDDEN_STATUS(state, { id, hidden }) {
    if (!state.viewData) {
      return
    }
    if (!id) return
    // 更改组件显隐
    const res = state.viewData.components.find(_c => {
      return _c.id === id
    })

    if (res) {
      res.hidden = hidden !== undefined ? hidden : !res.hidden
    }
  },
  CHANGE_REQ_PARAMS(state, data) {
    const { id, params } = data
    if (state.reqParams[id]) {
      state.reqParams[id] = Object.assign(state.reqParams[id], params)
    } else {
      state.reqParams[id] = params
    }
  }
}
const previewGetters = {

}

export {
  previewState,
  previewActions,
  previewMutations,
  previewGetters
}

