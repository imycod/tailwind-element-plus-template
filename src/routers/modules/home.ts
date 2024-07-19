const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  component: Layout,
  redirect: "/dashboard",
  meta: {
    icon: "ep:home-filled",
    title: "首页",
    rank: 0
  },
  children: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/dashboard/index.vue"),
      meta: {
        title: "首页",
      }
    }
  ]
};
