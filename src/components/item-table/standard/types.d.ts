export type columnProps = {
  type: string,
  key: string,
  label: string,
  prop: string,
  width?: string,
  fixed?: boolean,
  align?: string,
  render?: Function,
  renderHeader?: Function,
  showOverflowTooltip?: boolean,
  sortable?: boolean,
  sortMethod?: Function,
  sortBy?: string,
  sortOrders?: string[],
  className?: string,
  labelClassName?: string,
  selectable?: Function,
}
export type tableDataProps = {
  columns: columnProps[], // 列信息
  list: object[], // 数据列表
  pageData?: pageDataProps, // 分页数据
  loading?: boolean, // 加载状态
}
