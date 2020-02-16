<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="10" style="height:25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initCount"
      @change="countChanged"
      ref="numbox"
      readonly
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  data() {
    return {};
  },
  props: ["initCount", "id"],
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      this.$store.commit("updateCar", {
        id: this.id,
        count: parseInt(this.$refs.numbox.value)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>