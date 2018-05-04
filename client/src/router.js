import Vue from 'vue';
import Router from 'vue-router';
import Mockup from './views/Mockup.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mockup',
      component: Mockup,
    },
  ],
});
