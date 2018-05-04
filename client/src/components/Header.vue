<template>
     <div class="data-Header">
        <section>
          <Indicator-speedometer />
          <Indicator-gear />
        </section>

        <section class="pedals">
          <div class="pedal">
            <div class="empty" style="height: 10%"></div>
          </div>
          <div class="pedal">
            <div class="empty" style="height: 60%"></div>
          </div>
        </section>

        <Indicator-rpm />
    </div>
</template>

<script>
import {
  IndicatorSpeedometer,
  IndicatorGear,
  IndicatorRpm,
} from '../components/Indicators/index';

export default {
  name: 'Header',
  components: {
    IndicatorSpeedometer,
    IndicatorGear,
    IndicatorRpm,
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
