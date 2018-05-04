<template>
  <div class="direction">
    direction<br />
    <div class="bar">
      <div class="side left">
        <div class="fill" style="width: 57%;"></div>
      </div><!--
      --><div class="middle"></div><!--
      --><div class="side right">
        <div class="fill" style="width: 2%;"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndicatorDirection',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .direction {
    height: 10%;
    font-size: 1.5em;
    padding: 2vh 0;
    width: 100%;
  }
    .direction .bar {
      background-color: lightgrey;
      height: 1vh;
      width: 60%;
    }
      .direction .bar .side {
        height: 100%;
        width: calc(48% - 1vh);
        margin-top: -2vh;
      }
        .direction .bar .side.left {
          text-align: right;
        }
        .direction .bar .side.right {
          text-align: left;
        }
        .direction .bar .side .fill {
          background-color: green;
          height: 100%;
          margin-top: -2vh;
        }
      .direction .bar .middle {
        background-color: red;
        height: 100%;
        width: 1vh;
      }
</style>
