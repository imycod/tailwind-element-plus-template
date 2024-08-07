/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2024-07-18 22:48:32
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2024-08-05 20:09:34
 * @FilePath: \tailwind-element-plus-template\src\routers\modules\home.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
      path: "/template",
      name: "Template",
      component: () => import("@/views/template/index.vue"),
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
