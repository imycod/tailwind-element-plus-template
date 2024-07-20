const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  component: Layout,
  redirect: "/myProfile",
  children: [
    {
      path: "/myProfile",
      name: "My Profile",
      component: () => import("@/views/myProfile/index.vue"),
      meta: {
        icon: "UserCircle",
      },
    },
    {
      path: "/userList",
      name: "User List",
      component: () => import("@/views/userList/index.vue"),
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
