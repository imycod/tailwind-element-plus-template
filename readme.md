### theme color style
> 1.重置element-plus第三方组件库自定义的变量： tailwind.config.js: root.dark <br>
> 2.hooks/useColors & stores/modules/dark-mode.ts <br>
> 3.默认一开始重置：assets/styles/element/var.scss & utility-patterns.css <br>
#### 第三方组件库如：element-plus
组件库自带样式诸如：dialog里的文本text，dialog>text,会默认color用 --el-text-color-regular,所以我们需要重置此变量，在tailwind.config里重置。 <br>


#### 着色方式
多种使用方式，优先级root.dark > html.dark, 可以按照element-plus theme-chalk的文件组织方式，
把自定义的dark样式放到dark-var.scss这部分是特殊的样式内容占比较小。也可以一开始重置变量时直接在root、root.dark把变量重置好，
以后直接在template里用变量即可。最干净的方式是，1.导入变量在tailwind colors里，然后在root直接使用tailwindcss的变量，然后template里用root的变量，这时就能做到tailwindcss和element-plus样式一致。
当然有很多办法，在class里写的原子化类是tailwindcss自定义的colors，在template style给定的var 变量是我们在root指定好的。
1. tailwindcss 自定义的colors <br>
 </br>
2. root、root.dark bind tailwindcss colors & reset thrid party ui lib variables <br>
</br>
3. App.vue background color:var(--item-background-color-page) or class bg-black-400 <br>
<br>
4.  自己定义的可以区分样式文件，组件重置样式可以以组件名，写道单独的样式文件中，注意这是重置样式，如果是组件的私有业务样式可以写道组件style里，这样做可以以后复用组件Ui样式直接把style copy到别项目用  <br>
<br>

### 使用方式
1. assets/styles/colors
2. assets/styles/dark-var
3. assets/styles/var
4. assets/styles/index
5. App.vue -> style
6. layout/index.vue -> div.dark:bg-black-400
7. tailwind.config.js

### 组件库与自定义封装组件样式说明：
自己业务系统样式
```css
:root {
--el-menu-text-color: var(--white);
--el-menu-hover-bg-color: rgba(22, 120, 255, 0.2);
--el-menu-bg-color: var(--black-300); // 覆盖菜单背景颜色，原因是组件里里面只重置了dark模式下的菜单背景为透明色，但是亮色模式下没有重置，light mode是白色的
--item-menu-bg-color: var(--black-300); // 背景颜色
}

:root.dark {
 --item-menu-bg-color: var(--black-300); 
}
```
```vue
<template>
 <div class="item-layout-menu">
  <i-sidebar router :collapse="isCollapse" :class="[!isCollapse && 'w-[320px]']"
             :data="routesMenu"></i-sidebar>
 </div>
</template>

<style lang="scss" scoped>
 .item-layout-menu { // 举个例子而已
  background-color: var(--item-menu-bg-color); // 这里是用我们root.dark自己定义的变量，能覆盖是因为组件里面的dark模式背景是透明的。但其实light mode是白色的，所以这里可以覆盖，因此你可以在root覆盖
 }
</style>
```
如果组件库的组件样式写的很完备的情况下，比如dark和light都重置了就没有此问题，问题是如果设置了namespace当组件库没有设置情况，默认用的是el，这里拿element-plus举例。
此时自己封装的组件内部class name是-el-，当重置比如只考虑了dark模式，那么到业务系统切换成light模式时可能样式就会多少有些问题，此时要在root重置el样式即可
