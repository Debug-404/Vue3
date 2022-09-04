import {createRouter, createWebHashHistory} from "vue-router";
import {getToKen} from "../utils/userCookie.js";
import {ElNotification} from "element-plus";

const routes = [
    {
        path: "/",
        name: "login",
        component: () => import("../components/login.vue"),
    },
    {
        path: "/backstage",
        name: "backstage",
        component: () => import("../components/Backstage.vue"),
    },
    {
        path: "/backstage/admin",
        name: "admin",
        component: () => import("../components/admin.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../components/404.vue")
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (!getToKen() && to.path !== "/") {
        ElNotification({
            title: "Error",
            message: "请先登录",
            type: "error",
        });
        next({path: "/"})
    } else if (getToKen() && to.path === "/") {
        next({path:"/backstage"})
    } else {
        next()
    }
})


export default router;
