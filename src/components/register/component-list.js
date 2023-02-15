const files = require.context('../', true, /meta.js$/)
const cptData = []
// const modules = {}
const cptList = []
for (const key of files.keys()) {
  // modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
  cptList.push(files(key).default)
}
cptList.forEach((cpt) => {
  const idx = cptData.findIndex((_c) => {
    return _c.name === cpt.group
  });
  if (idx > -1) {
    cptData[idx].children.push(cpt)
  } else {
    cptData.push({ name: cpt.group, opened: false, icon: '', children: [cpt] })
  }
})
export default cptData
