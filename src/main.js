import { createApp } from 'vue'
import App from './App.vue'

import BasePin from './components/UI/BasePin.vue';
import BaseGuess from './components/UI/BaseGuess.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import BaseResultPin from './components/UI/BaseResultPin.vue';

const app = createApp(App);

app.component('base-pin', BasePin);
app.component('base-guess', BaseGuess);
app.component('base-dialog', BaseDialog);
app.component('base-result-pin', BaseResultPin);

app.mount('#app');
