const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  component: Layout,
  redirect: "/myProfile",
  children: [
    {
      path: "/myProfile",
      name: "My Profile",
      component: () => import("@/views/my-profile/index.vue"),
      meta: {
        icon: "UserCircle",
      },
    },
    {
      path: "/userList",
      name: "User List",
      component: () => import("@/views/user-list/index.vue"),
      meta: {
        icon: "ListBullet",
      },
    },
    {
      path: "/activity",
      name: "Activities",
      component: () => import("@/views/activies/index.vue"),
      meta: {
        icon: "ArrowTrendingUp",
      },
    },
    {
      path: "/setting",
      redirect: "/setting/department",
      meta: {
        icon: "Cog6Tooth",
        bottom:true,
      },
      name: "Setting",
      children: [
        {
          path: "/setting/department",
          name: "Department",
          component: () => import("@/views/setting/department/index.vue"),
          meta: {
       
          },
        },
      ],
    },
  ],
};
