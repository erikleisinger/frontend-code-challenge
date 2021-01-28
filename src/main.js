import { createApp } from 'vue';
import App from './App.vue';
import './App.css';

console.log(App)
const app = createApp(App)

const vm = app.mount('#app');

console.log(vm.json)
