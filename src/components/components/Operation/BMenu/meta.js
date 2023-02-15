export default {
  group: '操作',
  name: '菜单',
  icon: 'menu',
  componentName: 'BMenu',
  width: 150,
  height: 50,
  props: {
    cptDataForm: {
      dataText:
        '[{"value":"房地产公司","label":"房地产公司"},{"value":"通力达公司","label":"通力达公司" },{"value":"电器公司","label":"电器公司" },{"value":"科腾公司","label":"科腾公司" },{"value":"科技公司","label":"科技公司" },{"value":"工程设计院","label":"工程设计院" },{"value":"电安公司","label":"电安公司" },{"value":"泰捷公司","label":"泰捷公司" },{"value":"中诚公司","label":"中诚公司"},{"value":"正航公司","label":"正航公司"},{"value":"西南公司","label":"西南公司"},{"value":"电建公司","label":"电建公司"},{"value":"工程公司","label":"工程公司"},{"value":"技术公司","label":"技术公司"},{"value":"南电公司","label":"南电公司"},{"value":"从化输变电公司","label":"从化输变电公司"},{"value":"增电公司","label":"增电公司"},{"value":"城北公司","label":"城北公司"}]',
      dataSource: 1,
      pollTime: 0
    },
    attribute: {
      menuBgColor: '#fff',
      menuHeight: 100,
      textAlign: 'center',
      textColor: '#000',
      fontWeight: 500,
      fontSize: 16,
      activeTextColor: '#fff,',
      activeBgColor: '#fff,',
      menuItemHoverBgColor: 'red',
      menuItemHoverColor: '#fff'
      // radioValue: '',
      // placeholder: "请选择",
      // textColor: "#fff",
      // fontSize: 15,
      // fontWeight: 'normal',
      // event: false,
      // eType: "cpt",
      // // eType === 'cpt'
      // eventList: [],
      // // eType === 'params'
      // paramsList: [],
    }
  }
}
