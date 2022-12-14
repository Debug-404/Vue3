import {createApp} from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router/index.js";
import store from "./store/index.js";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(store);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
import 'virtual:windi.css'
app.mount("#app");
