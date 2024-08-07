import {tableDataProps,columnProps} from "./types.d"
/**
 * 从自己开始往上查找指定的插槽
 * @param slotName 插槽名称
 */
export function findParentSlot ($self:object, slotName:string="default") {
  console.log("往上找节点的插槽", $self.$slots)
  const slot = $self.$slots[slotName]
  const parent = $self.$parent
  return slot || (parent ? findParentSlot(parent, slotName) : null)
}

/**
* 生成插槽
* @param slotName 插槽名称
* @param scope 插槽作用域
* @returns 
*/
export function generateColumnSlot (slotName:string, scope:object) {
  const tempSlot = findParentSlot(this, slotName)
  return tempSlot ? tempSlot(scope) : undefined
}
  
/**
* 生成列的属性
* @param data 
* @param rhTableStore 
* @returns 
*/
export function genColumnProps (data:columnProps, rhTableStore:tableDataProps) {
  const obj = {
      "label": data.label,
      "prop": data.prop,
      "width": data.width,
      "minWidth": data.minWidth,
      "fixed": data.fixed,
      "align": data.align || rhTableStore?.align,
  }
  // 过滤掉为空的属性
  Object.keys(obj).forEach(key=> {
      if (!obj[key]) delete obj[key]
  })
  return obj
}
