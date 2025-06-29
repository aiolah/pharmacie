import './assets/bootstrap.min.css';

import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass, faXmark, faCircleCheck, faCheck, faTriangleExclamation, faFileMedical, faTablets } from "@fortawesome/free-solid-svg-icons";

/* import specific icons */
// import { all } from '@awesome.me/kit-KIT_CODE/icons'

library.add([faTrash, faPenToSquare, faPlus, faMagnifyingGlass, faXmark, faCircleCheck, faCheck, faTriangleExclamation, faFileMedical, faTablets]);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');