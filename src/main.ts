import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import registerIcons from './global/register-icons'
import 'normalize.css'
import '@/assets/css/index.less'
createApp(App).use(store).use(router).use(registerIcons).mount('#app')
