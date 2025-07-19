import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createBootstrap } from "bootstrap-vue-next";

const app = createApp(App);
app.mount("#app");
app.use(createBootstrap());
