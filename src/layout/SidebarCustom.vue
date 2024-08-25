<template>
    <div :class="open ? 'sidebar open' : 'sidebar closed'">
        <div class="sidebar-content">
            <template v-for="menu in data">
                <div v-if="menu.children" class="nav-sub" :href="menu.path" :key="menu.path"
                    :class="{ active: menu.active }" @click="activateMenu(menu)">
                    <div class="nav-item" :class="{ active: menu.active }">
                        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span class="nav-text">{{ menu.name }}</span>
                    </div>
                    <div class="nav-sub-item" v-for="child in menu.children" @click="activateMenu(child)">
                        <a class="nav-sub-item" :href="child.path">
                            <span class="nav-text">{{ child.name }}</span>
                        </a>
                    </div>
                </div>
                <a v-else class="nav-item" :class="{ active: menu.active }" :href="menu.path" @click="activateMenu(menu)">
                    <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span class="nav-text">{{ menu.name }}</span>
                </a>
            </template>
        </div>
        <a class="footer" href="#">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="nav-text">Account</span>
        </a>
    </div>
</template>

<script setup lang="ts">
const open = ref(true)

const data = [
    {
        name: 'Dashboard',
        path: '/myProfile',
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        active:true,
        children: [
            {
                active:true,
                name: 'Dashboard',
                path: '/userList',
            },
        ],
    },
]

function activateMenu(item) {
    const menus = flattenMenu(data)
    menus.forEach((menu) => {
        menu.active = false;
    });
    item.active = true;
}

const flattenMenu = (menuArray) => {
    const result = [];
    menuArray.forEach((menu) => {
        result.push(menu); // 将当前项加入结果数组中
        if (menu.children) {
            result.push(...flattenMenu(menu.children)); // 如果有 children，递归打平
        }
    });
    return result;
};



const menuData = computed(() => flattenMenu(data))


function onWindowResize() {
    if (window.innerWidth < 768) {
        open.value = false
    } else {
        open.value = true
    }
}
onMounted(() => {
    window.addEventListener('resize', onWindowResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize)
})
</script>

<style lang="scss" scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    transition: all 0.3s ease-in-out;

    &.open {
        width: 360px;
    }

    &.closed {
        width: 70px;
    }
}

.sidebar-content {
    width: 100%;
    padding: 0 12px;
    margin-top: 12px;
}

.nav-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    padding: 0 12px;
    border-radius: 8px;
    color: white;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    background-color: transparent;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
        background-color: #374151;
        /* bg-gray-700 */
        color: #d1d5db;
        /* text-gray-300 */
    }

    &:not(:last-child) {
        margin-bottom: 10px;
    }
}

.nav-sub {
    &-item {
        display: flex;
        flex-direction: column;
        padding-left: 12px;
        display: none;
    }

    &:not(:last-child) {
        margin-bottom: 10px;
    }

    &.active {

        .nav-sub-item {
            display: block;
        }
    }
}

.nav-item.active {
    background-color: #374151;
    /* bg-gray-700 */
    color: #d1d5db;
    /* text-gray-300 */
}

.nav-icon {
    width: 24px;
    height: 24px;
    stroke: currentColor;
}

.nav-text {
    margin-left: 8px;
    display: none;
    font-size: 14px;
}

.open .nav-text {
    display: block;
}


.footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 64px;
    margin-top: auto;
    background-color: #1f2937;
    /* bg-gray-800 */
    transition: background-color 0.2s, color 0.2s;

    &:hover {
        background-color: #374151;
        /* bg-gray-700 */
        color: #d1d5db;
        /* text-gray-300 */
    }
}
</style>