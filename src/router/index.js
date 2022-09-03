import {createRouter, createWebHashHistory} from "vue-router";
const routes = [
    {
        path: "/",
        name:"login",
        component: ()=>import("../components/login.vue"),
    },
    {
        path: "/backstage",
        name:"backstage",
        component: ()=>import("../components/Backstage.vue"),
    },
    {
      path: "/backstage/admin",
      name:"admin",
      component:()=>import("../components/admin.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: ()=>import("../components/404.vue")
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from)=>{

})


export default router;
