// 按需引入element-plus（该方法稳定且明确。当然也支持：https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5）
import type { App, Component } from "vue";
import {
    ElButton,
    ElButtonGroup,
    ElCheckbox,
    ElCheckboxButton,
    ElCheckboxGroup,
    ElDatePicker,
    ElForm,
    ElFormItem,
    ElInput,
    ElInputNumber,
    ElRadio,
    ElRadioButton,
    ElRadioGroup,
    ElRate,
    ElSelect,
    ElOption,
    ElOptionGroup,
    ElSelectV2,
    ElSwitch,
    ElTable,
    ElTableColumn,
    ElTableV2,
    ElTimePicker,
    ElTimeSelect,
    ElTreeSelect,
} from "element-plus";

import ItemMore from "@/components/item-more/index.vue";
import ItemTable from "@/components/item-table/index.vue";
import ItemSearch from "@/components/item-table/search.vue";
// import ItemProForm from "@/components/item-pro-form/index.vue";
import ItemProTable from "@/components/item-pro-table/index.vue";
import ItemWrapperSearch from "@/components/wrapper-search.vue";
import ItemTabs from "@/components/Tabs.vue";
import ItemBack from "@/components/Back.vue";

const components = [
    ElButton,
    ElButtonGroup,
    ElCheckbox,
    ElCheckboxButton,
    ElCheckboxGroup,
    ElDatePicker,
    ElForm,
    ElFormItem,
    ElInput,
    ElInputNumber,
    ElRadio,
    ElRadioButton,
    ElRadioGroup,
    ElRate,
    ElSelect,
    ElOption,
    ElOptionGroup,
    ElSelectV2,
    ElSwitch,
    ElTable,
    ElTableColumn,
    ElTableV2,
    ElTimePicker,
    ElTimeSelect,
    ElTreeSelect,
]

export function registerComponent(app: App) {
    // 全局注册组件
    components.forEach((component: Component) => {
        app.component(component.name, component);
    });
    app.component('item-more', ItemMore)
    app.component('item-table', ItemTable)
    app.component('item-search', ItemSearch)
    // app.component('item-pro-form',ItemProForm)
    app.component('item-pro-table', ItemProTable)
    app.component('item-wrapper-search', ItemWrapperSearch)
    app.component('item-tab', ItemTabs)
    app.component('item-back', ItemBack)
}