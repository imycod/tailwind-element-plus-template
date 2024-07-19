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
      component: () => import("@/views/dashboard/index.vue"),
      meta: {
        icon: "UserCircle",
      },
    },
    {
      path: "/userList",
      name: "User List",
      component: () => import("@/views/dashboard/index.vue"),
      meta: {
        icon: "ListBullet",
      },
    },
    {
      path: "/activity",
      name: "Activities",
      component: () => import("@/views/dashboard/index.vue"),
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
          component: () => import("@/views/dashboard/index.vue"),
          meta: {
       
          },
        },
      ],
    },
  ],
};
