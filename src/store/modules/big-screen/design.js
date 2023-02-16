// 大屏设计器状态存储
const designState = {
  // 大屏总数据
  bigScreenData: {
    id: '',
    title: '你的大屏',
    screenWidth: 1920,
    screenHeight: 1080,
    bgColor: '#1d1e1f',
    description: '',
    bgImg: '',
    isPublic: true,
    password: '',
    components: []
  },
  // 窗口宽度
  windowWidth: 0,
  // 窗口高度
  windowHeight: 0,
  // 画布容器
  webContainer: undefined,
  // 容器缩放比例
  containerScale: 1,
  // 已经添加到画布中的组件列表
  componentList: [],
  // 常用组件列表
  historyUsedCpts: [],
  // 当前选中的组件
  curComponent: { cptOption: undefined },
  // 当前选中组件的下标
  curComponentIndex: -1,
  // 画布背景风格 分为点阵和网格 lattice / grid
  canvasBgStyle: 'lattice',
  // 是否显示标尺
  isShowRuler: true,
  // 是否显示组件面板
  componentPaneWidth: 200,
  // 是否显示配置面板
  configPaneWidth: 300,
  // 是否显示组件坐标
  isShowCoord: false
}
const designActions = {
  /** 大屏总数据操作 */
  // 初始化大屏数据
  initBigScreenData({ commit }, data) {
    commit('INIT_BIG_SCREEN_DATA', data)
  },

  setBigScreenData({ commit }, params) {
    commit('SET_BIG_SCREEN_DATA', params)
  },

  /** 设置画布样式等 */
  // 设置显示坐标 or not
  setCoordShowStatus({ commit, state, dispatch }, data) {
    commit('SET_COORD_SHOW_STATUS', data)
  },
  // 设置显示标尺 or not
  setRuleShowStatus({ commit, state, dispatch }, data) {
    commit('SET_RULE_SHOW_STATUS', data)
  },
  // 更改画布背景风格
  changeCanvasBgStyle({ commit, state, dispatch }, style) {
    state.canvasBgStyle = style
  },
  // 切换组件及属性设置面板显示状态
  changePaneDisplayStatus({ commit, state, dispatch }, type) {
    if (type === 'left') {
      state.componentPaneWidth = state.componentPaneWidth === 0 ? 200 : 0
    } else {
      state.configPaneWidth = state.configPaneWidth === 0 ? 300 : 0
    }
    dispatch('initContainerSize')
  },

  // 画布容器，目前 用于截图
  setContainer({ state }, elRef) {
    state.webContainer = elRef
  },

  // 更改容器缩放比例
  changeScale({ state }, val) {
    state.containerScale = val
  },

  // 初始化容器缩放比例
  initContainerSize({ state, dispatch }) {
    state.windowWidth = document.documentElement.clientWidth
    state.windowHeight = document.documentElement.clientHeight
    const tempWidth = state.windowWidth - state.componentPaneWidth - state.configPaneWidth - 45
    const tempHeight = state.windowHeight - 65
    const screenX = (tempWidth / state.bigScreenData.screenWidth).toFixed(2) * 1
    const screenY = (tempHeight / state.bigScreenData.screenHeight).toFixed(2) * 1
    const minScale = Math.min(screenX, screenY)
    // 设置缩放最小值，避免缩放过小页面卡死
    state.containerScale = minScale <= 0.02 ? 0.02 : minScale
  },

  // /** 画布组件操作 */
  // 当前组件下标
  setCurComponentIndex({ commit }, index) {
    commit('SET_CUR_COMPONENT_INDEX', index)
  },
  // 初始化组件列表
  initComponentList({ commit }, cpts) {
    commit('INIT_COMPONENT_LIST', cpts)
  },
  // 复制组件
  addCpt({ commit }, cpt) {
    commit('ADD_CPT', cpt)
  },
  // 删除画布中的组件
  delCpt({ commit }, index) {
    commit('DEL_CPT', index)
  },
  // 清空画布
  clearCanvas({ commit }) {
    commit('CLEAR_CANVAS')
  },
  // 设置当前选中的组件
  setCurComponent({ commit }, cpt) {
    commit('SET_CUR_COMPONENT', cpt)
  },
  // 更新组件信息, params 包含两个值
  // 一个是 id
  // 一个是需要修改的属性键值对 data: { key: value }
  // 如：要更改 id 为 1 的组件的可见度，则需要传值为 this.$store.dispatch('bigScreen/updateCptProp', { id: 1, data: { hidden: true } })
  updateCptProp({ commit }, params) {
    commit('UPDATE_CPT_PROP', params)
  }
}
const designMutations = {
  INIT_BIG_SCREEN_DATA(state, data) {
    state.bigScreenData = data
  },
  SET_BIG_SCREEN_DATA(state, params) {
    state.bigScreenData = Object.assign(state.bigScreenData, params)
  },
  INIT_COMPONENT_LIST(state, cpts) {
    state.componentList = cpts
  },
  INIT_FREQUENTLY_USED_COMPONENTS(state) {
    const cpts = localStorage.getItem('frequentlyUsedCpts')
    state.historyUsedCpts = JSON.parse(cpts) || []
  },
  ADD_HISTORY_USED_CPT(state, cpt) {
    const idx = state.historyUsedCpts.findIndex(_f => {
      return _f.name === cpt.name
    })
    if (idx > -1) {
      state.historyUsedCpts[idx].num += 1
    } else {
      const tempVal = JSON.parse(JSON.stringify(cpt))
      tempVal.num = 1
      state.historyUsedCpts.push(tempVal)
    }
    state.historyUsedCpts.sort(function(a, b) {
      return b['num'] - a['num']
    })
    const cpts = JSON.stringify(state.historyUsedCpts)
    localStorage.setItem('frequentlyUsedCpts', cpts)
  },
  ADD_CPT(state, cpt) {
    state.componentList.push(cpt)
  },
  DEL_CPT(state, index) {
    const id = state.componentList[index].id
    state.componentList.splice(index, 1)
    // 从全局组件引用中删除对应引用
    this.commit('bigScreen/DEL_BIG_SCREEN_CPT_REF', id)
  },
  CLEAR_CANVAS(state) {
    state.componentList = []
  },
  SET_COORD_SHOW_STATUS(state, data) {
    state.isShowCoord = data
  },
  SET_RULE_SHOW_STATUS(state, data) {
    state.isShowRuler = data
  },
  SET_CUR_COMPONENT(state, cpt) {
    // 图层滚动至图层容器中心可视区
    const el = document.querySelector('#layer' + cpt.id)
    setTimeout(() => {
      el &&
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
    }, 0)
    state.curComponent = cpt
  },
  SET_CUR_COMPONENT_INDEX(state, index) {
    state.curComponentIndex = index
  },
  UPDATE_CPT_PROP(state, params) {
    const { id, data } = params
    if (id === state.curComponent.id) {
      state.curComponent = Object.assign(state.curComponent, data)
    } else {
      let targetComponent = state.componentList.find(_c => {
        return _c.id === id
      })
      const tempVal = Object.assign(targetComponent, data)
      targetComponent = tempVal
    }
  }
}
const designGetters = {
  // 画布背景 分为点阵和网格 lattice / grid
  designAreaStyle(state) {
    if (state.canvasBgStyle === 'lattice') {
      return {
        'background-color': '#18181c',
        height: state.windowHeight - 45 + 'px',
        display: 'flex',
        'background-image': `linear-gradient(#18181c 14px,transparent 0),linear-gradient(90deg,transparent 14px,#86909c 0)`,
        'background-size': `15px 15px`
      }
    } else {
      // 竖线  竖线背景 横线 横线背景
      return {
        height: state.windowHeight - 45 + 'px',
        display: 'flex',
        background:
          'linear-gradient(-90deg, #545d63 1px, transparent 0px) 0px 0px / 20px 20px, linear-gradient(0deg, #545d63 1px, #18181c 0px) 0px 0px / 20px 20px'
      }
    }
  }
}

export { designState, designActions, designMutations, designGetters }
