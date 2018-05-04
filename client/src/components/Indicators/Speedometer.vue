<template>
  <div class="kmh">
    <span>237</span> km/h
  </div>
</template>

<script>
export default {
  name: 'IndicatorSpeedometer',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .kmh {
    display: inline-block;
    height: 10vh;
    line-height: 10vh;
    font-size: 2em;
  }
    .kmh span {
      font-size: 4em;
    }
</style>
