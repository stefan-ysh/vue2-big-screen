/**
 * 设计器/预览的模板数据源
 *
 * 统一从 src/api/mock 派生（单一真源），layout 结构在此处
 * 通过 convertLayoutToComponents 转换为设计器使用的 components 结构，
 * 避免同一大屏在两处重复维护导致 schema 漂移。
 */
import mockData from '@/api/mock'
import { convertLayoutToComponents } from '@/api/bigscreen'

function toDesignerTemplate(screen) {
  if (!screen) return null
  return {
    ...screen,
    components: Array.isArray(screen.components)
      ? screen.components
      : convertLayoutToComponents(screen.layout || [])
  }
}

const templates = {}
Object.keys(mockData).forEach(type => {
  const typeData = mockData[type] || {}
  const sources = [...(typeData.templates || []), ...(typeData.screens || [])]
  templates[type] = sources.map(toDesignerTemplate).filter(Boolean)
})

export default templates
