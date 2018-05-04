import Vue from 'vue';
import Mockup from '@/pages/Mockup';

describe('Mockup.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Mockup);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.rpm span').textContent)
      .toEqual('12000 rpm');
  });
});
