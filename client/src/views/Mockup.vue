<template>
  <div class="page">

    <header class="top-section">
    <Header />
    </header>

    <Car />
  </div>
</template>

<script>

import { Car, Header } from '../components/index';

export default {
  name: 'Mockup',
  components: {
    Car,
    Header,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  padding: 0;
}
  div {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
  }
  .page {
    width: 100%;
  }

  .top-section {
    background-color: green;
    display: block;
    height: 20vh;
    padding: 10px 20px;
  }
  .top-section > div {
    margin: 0 3vh;
  }


</style>
