<template>
  <div class="relative inline-flex">
    <button
        ref="trigger"
        class="inline-flex justify-center items-center group"
        aria-haspopup="true"
        @click.prevent="dropdownOpen = !dropdownOpen"
        :aria-expanded="dropdownOpen"
    >
      <img class="w-8 h-8 rounded-full" :src="defaultAvartar" width="32" height="32" alt="User"/>
      <div class="flex items-center truncate">
        <span
            class="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">Acme Inc.</span>
        <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500" viewBox="0 0 12 12">
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
        </svg>
      </div>
    </button>
    <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-out duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen"
           class="origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-black-400 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
           :class="align === 'right' ? 'right-0' : 'left-0'">
        <div class="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60" v-if="false"></div>
        <ul
            ref="dropdown"
            @focusin="dropdownOpen = true"
            @focusout="dropdownOpen = false"
        >
          <li>
            <div
                @click="changePassword"
                class="font-medium cursor-pointer dark:text-gray-300 text-sm hover:text-blue-600 dark:hover:text-violet-400 flex items-center py-1 px-3">
              Change Password
            </div>
          </li>
          <li>
            <div
                @click="logout"
                class="font-medium cursor-pointer dark:text-gray-300 text-sm hover:text-blue-600 dark:hover:text-violet-400 flex items-center py-1 px-3">
              Log Out
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import defaultAvartar from "@/assets/svg/system.svg"
import {addDialog} from "@/components/item-dialog/index.ts";
import {useUserStoreHook} from "@/stores/modules/user.ts";
import ChangePassword from "@/components/change-password/index.vue"

export default {
  name: 'DropdownProfile',
  props: ['align'],
  data() {
    return {
      defaultAvartar,
    }
  },
  setup() {

    const dropdownOpen = ref(false)
    const trigger = ref(null)
    const dropdown = ref(null)

    // close on click outside
    const clickHandler = ({target}) => {
      if (!dropdownOpen.value || dropdown.value.contains(target) || trigger.value.contains(target)) return
      dropdownOpen.value = false
    }

    // close if the esc key is pressed
    const keyHandler = ({keyCode}) => {
      if (!dropdownOpen.value || keyCode !== 27) return
      dropdownOpen.value = false
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })

    function changePassword() {
      addDialog({
        title: 'Change Password',
        contentRenderer: () => h(ChangePassword),
        props: {
          title: 'Change Password',
        },
        beforeCancel(){
          ElMessage.warning('测试文字')
        }
      })
    }

    const userStore = useUserStoreHook()
    const logout = userStore.logout

    return {
      dropdownOpen,
      trigger,
      dropdown,
      changePassword,
      logout,
    }
  }
}
</script>