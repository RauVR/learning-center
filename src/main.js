import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

//PrimeVue theme
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/md-light-indigo/theme.css";
import DataTable from "primevue/datatable";
import Toolbar from "primevue/toolbar";
import Column from "primevue/column";
import InputText from "primevue/inputtext";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

//PrimeVue components
app.component("DataTable", DataTable);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Column", Column);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Toolbar", Toolbar);
app.component("InputText", InputText);



app.mount("#app");
