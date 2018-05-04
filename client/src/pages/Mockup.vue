<template>
  <div class="page">
    <div class="top-section">
      <indicator-speedometer />
      <indicator-gear />
      <div class="pedals">
        <div class="pedal">
          <div class="empty" style="height: 10%"></div>
        </div>
        <div class="pedal">
          <div class="empty" style="height: 60%"></div>
        </div>
      </div>
      <indicator-rpm />
    </div>

    <div class="car">

      <div class="bloque-delatero tercio">

        <div class="wheel">
          <div class="break break-top">
            <div class="break-half">150</div>
            <div class="break-half">120</div>
          </div>
          <div class="temp half">30</div>
          <div class="pression half">1,2</div>
        </div>

        <div class="wheel">
          <div class="break break-bottom">
            <div class="break-half">150</div>
            <div class="break-half">120</div>
          </div>
          <div class="temp half">30</div>
          <div class="pression half">1,2</div>
        </div>
      </div>

      <div class="bloque-motor tercio">
        <indicator-direction />
        <div class="engine">
          <div class="engine-half engine-oil-tem">190</div>
          <div class="engine-half engine-water-tem">85</div>
        </div>

        <div class="cooler">
          <div class="cooler-temp cooler-temp-in">85</div>
          <div class="cooler-temp cooler-temp-out">85</div>
        </div>
        <div class="cooler">
          <div class="cooler-temp cooler-temp-in">85</div>
          <div class="cooler-temp cooler-temp-out">85</div>
        </div>
      </div>

      <div class="bloque-trasero tercio">
        <div class="wheel">
          <div class="break break-top">
            <div class="break-half">150</div>
            <div class="break-half">120</div>
          </div>
          <div class="temp half">30</div>
          <div class="pression half">1,2</div>
        </div>

        <div class="wheel">
          <div class="break break-bottom">
            <div class="break-half">150</div>
            <div class="break-half">120</div>
          </div>
          <div class="temp half">30</div>
          <div class="pression half">1,2</div>
        </div>
      </div>

      <!-- <img src="img/coche.png"> -->

    </div>
  </div>
</template>

<script>
import {
  IndicatorDirection,
  IndicatorRpm,
  IndicatorSpeedometer,
  IndicatorGear,
} from '../components/Indicators/index';

export default {
  name: 'Mockup',
  components: {
    IndicatorDirection,
    IndicatorRpm,
    IndicatorSpeedometer,
    IndicatorGear,
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
.page {background: url("../assets/formula.svg"); background-size: cover;}
  div {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
  }

  .top-section,
  .car {
    display: block;
  }

  .top-section {
    margin-top: 5vh;
    height: 20vh;
  }
  .top-section > div {
    margin: 0 3vh;
  }

  .car {
    position: relative;
  }

    .car img {
      left: 50%;
      opacity: .16;
      position: absolute;
      top: 0;
      transform: translate(-50%);
      width: 80%;
      z-index: 1;
      display: none;
    }

  .pedal {
    height: 15vh;
    width: 4vw;
    background-color: grey;
  }
    .pedal .empty {
      background-color: lightgrey;
      height: 100%;
      vertical-align: top;
      width: 100%;
    }

  /**/


  .wheel {
    position: relative;
    border: 1px solid black;
    height: 20vh;
      width: 20vw;
      margin: 5vh 0;
  }

    .wheel .half {
      background-color: white;
      border: 1px solid black;
      font-size: 2em;
      height: 50%;
      line-height: 10vh;
      width: 100%;
    }

    .wheel .break {
      border: 1px solid lightgrey;
      font-size: 2em;
      margin-left: 5%;
      width: 90%;
    }
      .wheel .break .break-half {
        width: 48%;
      }

    .wheel .break-top {
      position: absolute;
      margin-top: -5vh;
    }

    .wheel .break-bottom {
      position: absolute;
      margin-top: 25vh;
    }

  .tercio {
    width: 30vw;
    display: inline-block;
  }

  .bloque-motor {
    border: 2px solid black;
    height: 50vh;
  }

  .bloque-delantero,
  .bloque-trasero,
  .bloque-motor {
    z-index: 2;
  }

  .engine {
    height: 30%;
    line-height: 15vh;
    font-size: 3em;
    width: 100%;
  }

    .engine .engine-half {
      width: 40%;
    }

  .cooler {
    margin-top: 8vh;
    font-size: 2.5em;
    width: 48%;
  }

    .cooler .cooler-temp {
      width: 100%;
    }

</style>
