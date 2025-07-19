import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "./assets/main.css";

import { createApp } from "vue";
import { createBootstrap } from "bootstrap-vue-next";
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persistedstate';

import App from "./App.vue";
import router from "./routes";

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(createBootstrap());
app.mount("#app");
