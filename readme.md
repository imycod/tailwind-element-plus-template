### theme color style
> 1.重置element-plus第三方组件库自定义的变量： tailwind.config.js: root.dark <br>
> 2.hooks/useColors & stores/modules/dark-mode.ts <br>
> 3.默认一开始重置：assets/styles/element/var.scss & utility-patterns.css <br>
#### 第三方组件库如：element-plus
组件库自带样式诸如：dialog里的文本text，dialog>text,会默认color用 --el-text-color-regular,所以我们需要重置此变量，在tailwind.config里重置。 <br>