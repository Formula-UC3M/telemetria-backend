<template>
  <div class="rpm">
    <span>12000 rpm</span>
    <div class="porcentaje">
      <div class="fill"></div>
      <div class="cut"></div>
    </div>
    <div class="embrague"></div>
  </div>
</template>

<script>
export default {
  name: 'IndicatorRpm',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .rpm {
    width: 30vw;
  }

    .rpm span {
      width: 100%;
      height: 4vh;
      font-size: 2em;
    }

    .rpm .porcentaje {
      background-color: lightgrey;
      height: 4vh;
      margin: 1vh 0;
      position: relative;
      text-align: left;
      width: 90%;
    }
      .rpm .porcentaje .fill {
        background-color: green;
        height: 100%;
        width: 60%;
      }

      .rpm .porcentaje .cut {
        position: absolute;
        right: -5vh;
        background-color: red;
        height: 100%;
        width: 4vh;
      }

    .rpm .embrague {
      width: 90%;
      height: 4vh;
      background-color: yellow;
      margin: 1vh 0;
    }
</style>
