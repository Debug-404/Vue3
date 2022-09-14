import {createRouter, createWebHashHistory} from "vue-router";
import {getToKen} from "../utils/userCookie.js";
import {ElNotification} from "element-plus";

const routes = [
    {
        path: "/",
        name: "login",
        component: () => import("../components/login.vue"),
        meta: {
            title: "登录"
        }
    },
    {
        path: "/backstage",
        name: "backstage",
        component: () => import("../components/Backstage.vue"),
        children: [
            {
                path: '',
                component: () => import("../components/Body/Content.vue"),
                meta: {
                    title: "学生信息"
                }
            },
            {
                path: "score",
                component: () => import("../components/Body/allScore.vue"),
                meta: {
                    title: "学生成绩"
                }
            },
            {
                path: "StudentScore/:id",
                name: "StudentScore",
                component: () => import("../components/Body/oneScore.vue"),
                meta: {
                    title: "单人成绩"
                }
            },
            {
                path: "course",
                component: () => import("../components/Body/Course.vue"),
                meta: {
                    title: "课程人数"
                }
            }
        ]
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
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    if (!getToKen() && to.path !== "/") {
        ElNotification({
            title: "Error",
            message: "请先登录",
            type: "error",
        });
        next({path: "/"})
    } else if (getToKen() && to.path === "/") {
        next({path: "/backstage/"})
    } else {
        next()
    }
})


export default router;
