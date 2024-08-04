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
