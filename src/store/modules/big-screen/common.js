// 大屏设计器状态存储
const commonState = {
  cptRefs: new Map()
}
const commonActions = {

}
const commonMutations = {
  ADD_BIG_SCREEN_CPT_REF(state, data) {
    const { id, ref } = data
    state.cptRefs.set(id, ref)
  },
  DEL_BIG_SCREEN_CPT_REF(state, cptId) {
    state.cptRefs.delete(cptId)
  },
  CLEAR_BIG_SCREEN_CPT_REF(state) {
    state.cptRefs.clear()
  }

}
const commonGetters = {

}

export {
  commonState,
  commonActions,
  commonMutations,
  commonGetters
}

