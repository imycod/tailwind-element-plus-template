import { inject, h, resolveComponent } from "vue"
import { ElTableColumn } from "element-plus"
import type { columnProps, tableDataProps } from "./types.d"
import {generateColumnSlot,genColumnProps} from "./helper.ts"

export default {
  name: "RenderColumnList",
  components: {
    ElTableColumn,
  },
  setup() {
    const rhTableStore = inject("rhTableStore")
    // 渲染列的信息, renderColumnList不可为箭头函数,因为call不能改变其this指向
    function renderColumnList(columns = []) {
      const $self = this
      return columns.map((column) => {
        let slot = {} // 插槽
        if (column.header) {
          // generateColumnSlot 从自身往上找指定的插槽
          slot.header = (scope) => generateColumnSlot.call($self, column.header, scope) // 自定义表头
        }
        slot.default = (scope) => {
          const { row, $index } = scope
          // 顺序：multiHeader->render->slot->prop->default
          if (column.multiHeader && Array.isArray(column.list) && column.list.length) {
            // 多级表头,递归调用
            return renderColumnList.call($self, column.list)
          } else if (column.render && typeof column.render === "function") {
            // 用户指定了render函数, render函数作用:计算后的值,不包含标签
            return h("span", column.render(row, $index))
          } else if (column.slot) {
            return generateColumnSlot.call($self, column.slot, scope)
          } else if (column.prop) {
            return row[column.prop] || "-"
          } else {
            return generateColumnSlot.call($self, "default", scope)
          }
        }
        // 引用组件方式：h(resolveComponent("ElTableColumn")) 加载全局组件；也可h(ElTableColumn),但需在compoennts注册或在组合式API中导入
        // genColumnProps 生成当前列的参数对象
        return h(ElTableColumn, genColumnProps(column, rhTableStore), slot)
      }
      )
    }
    return {
      renderColumnList,
    }
  },
  render() {
    const { columns } = this.$attrs
    const { renderColumnList } = this
    const $self = this
    console.log(renderColumnList.call($self, columns))
    return renderColumnList.call($self, columns) // renderColumnList内部需借助当前this查找父组件
  },
}
