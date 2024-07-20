export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "login",
      showLink: false,
    }
  },
  // {
  //   path: "/redirect",
  //   component: Layout,
  //   meta: {
  //     title: "加载中...",
  //     showLink: false,
  //     rank: 102
  //   },
  //   children: [
  //     {
  //       path: "/redirect/:path(.*)", 
  //       name: "Redirect",
  //       component: () => import("@/layout/redirect.vue")
  //     }
  //   ]
  // },
  // {
  //   path: "/:pathMatch(.*)*",
  //   // redirect: '/',
  //   name: "404",
  //   component: () => import("@/views/error/404.vue"),
  //   meta: {
  //     title: "404"
  //   }
  // }
];
