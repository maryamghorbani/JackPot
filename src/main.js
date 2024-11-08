import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-green/theme.css";
import Tooltip from "primevue/tooltip";
import "./style.css";
import App from "./App.vue";
import router from './router';
import "../src/styles/app.css";
const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(PrimeVue);
app.use(pinia);
app.directive("tooltip", Tooltip);
app.mount("#app");
