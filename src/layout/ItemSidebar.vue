<template>
  <div class="min-w-fit">
    <!-- Sidebar backdrop (mobile only) -->
    <!--    <div class="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"-->
    <!--         :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'" aria-hidden="true"></div>-->

    <!--    &lt;!&ndash; Sidebar &ndash;&gt;-->
    <!--    <div id="sidebar" ref="sidebar"-->
    <!--         class="flex lg:!flex p-0 flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-black-300 p-4 transition-all duration-200 ease-in-out"-->
    <!--         :class="['shadow-sm', sidebarOpen ? 'translate-x-0' : '-translate-x-64']">-->
    <el-menu default-active="2" :collapse="isCollapse" class="item-layout-menu">
      <!-- <el-menu-item index="2" v-for="menu in topNav" :key="menu.path">
        <el-icon>
          <component :is="icon(menu.meta.icon)" class="w-[21px] h-[18px]" />
        </el-icon>
        <span>{{ menu.name }}</span>
      </el-menu-item> -->
      <el-menu-item class="logo" index="0">
        <img
            style="width: 100px"
            src="@/assets/svg/logo-dark.svg"
            alt="Pass logo"
        />
      </el-menu-item>
      <div class="item-layout-menu-list">
        <div class="item-layout-menu-list-topNav">
          <template v-for="menu in topNav">
            <template v-if="menu.children">
              <el-sub-menu :index="children.path" v-for="children in menu.children" :key="children.path">
                <template #title>
                  <el-icon>
                    <component :is="icon(menu.meta.icon)" class="w-[21px] h-[18px]"/>
                  </el-icon>
                  <span>{{ menu.name }}</span>
                </template>
                <el-menu-item :index="children.path">
                  <span>{{ children.name }}</span>
                </el-menu-item>
              </el-sub-menu>
            </template>
            <template v-else>
              <el-menu-item :index="menu.path">
                <el-icon>
                  <component :is="icon(menu.meta.icon)" class="w-[21px] h-[18px]"/>
                </el-icon>
                <span>
                  {{ menu.name }}
                </span>
              </el-menu-item>
            </template>
          </template>
        </div>

        <div class="item-layout-menu-list-bottomNav">
          <template v-for="menu in bottomNav">
            <template v-if="menu.children">
              <el-sub-menu :index="children.path" v-for="children in menu.children" :key="children.path">
                <template #title>
                  <el-icon>
                    <component :is="icon(menu.meta.icon)" class="w-[21px] h-[18px]"/>
                  </el-icon>
                  <span>{{ menu.name }}</span>
                </template>
                <el-menu-item :index="children.path">
                  <span>{{ children.name }}</span>
                </el-menu-item>
              </el-sub-menu>
            </template>
            <template v-else>
              <el-menu-item :index="menu.path">
                <el-icon>
                  <component :is="icon(menu.meta.icon)" class="w-[21px] h-[18px]"/>
                </el-icon>
                <span>
                  {{ menu.name }}
                </span>
              </el-menu-item>
            </template>
          </template>
        </div>
      </div>
    </el-menu>
    <!--    </div>-->
  </div>
</template>

<script lang="ts" setup>
import * as heroIcons from '@heroicons/vue/24/outline'
import {useWindowSize} from '@vueuse/core'
import {routes} from "@/routers"

const props = defineProps({
  sidebarOpen: Boolean,
})

const icon = (name) => heroIcons[name + 'Icon']

const topNav = ref([]) // top  
const bottomNav = ref([]) // bottom
const routesMenu = routes[0].children

function initMenu() {
  bottomNav.value = routesMenu.filter(item => item?.meta?.bottom)
  topNav.value = routesMenu.filter(item => !item?.meta?.bottom)
}

const isCollapse = ref(false)
const {width} = useWindowSize()
const stop = watchEffect(() => {
  if (width.value < 1200) {
    isCollapse.value = true
  } else {
    isCollapse.value = false
  }
})

onUnmounted(() => {
  stop()
})
onMounted(() => {
  initMenu()
})
</script>

<style lang="scss" scoped>
.item-layout-menu {
  //--item-menu-bg-color: rgba(12, 32, 53, 0.7);
  //--item-menu-text-color:#fff;
  border-right: none;
  height: 100%;
  padding: 10px 10px;

  .logo {
    margin-top: 20px;

    &:hover {
      background: none !important;
    }
  }

  &-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 80px);

    &-topNav {
      margin-top: 30px;
    }

    &-bottomNav {

    }

  }


  &.item-menu--collapse {
    .item-menu-item, .item-sub-menu {
      overflow: hidden;
      @apply md:relative;
      .item-icon {
        @apply sm:after:absolute -left-[10px] sm:after:w-full sm:after:h-full;
      }
    }
  }

  .item-menu-item, .item-sub-menu {
    border-radius: 10px !important;
    //margin: 0px 10px; // el-menu wrapper not wrapper raw div
    //@apply md:relative;
    .item-icon{
    //  @apply sm:after:absolute -left-[10px] sm:after:w-full sm:after:h-full;
      margin-right: 10px;
    }
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  &:not(.item-menu--collapse) {
    width: 330px;
  }

  :deep(.item-sub-menu__title) {
    border-radius: 10px;
    margin-bottom: 2px;
  }
}
</style>