export default {
  group: '文本',
  name: '输入框',
  icon: 'map-gc',
  componentName: 'BInput',
  hidden: true,
  width: 200,
  height: 50,
  props: {
    attribute: {
      label: '姓名',
      placeholderValue: '请输入姓名',
      value: '',
      type: 'text',
      labelWidth: 80,
      labelPosition: 'left',
      formSize: 'mini',
    }
  }
}
