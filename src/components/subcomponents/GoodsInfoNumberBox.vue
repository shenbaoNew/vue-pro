<template>
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="qty">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
  data(){
    return {
    }
  },
  props:['qty'],
  watch:{
    //子组件依赖父组件通过异步获取到的数据，这里要监听，因为一开始是undifined
    'qty':function(newValue,oldValue){
      mui(".mui-numbox").numbox().setOption('max',newValue)
    }
  },
  mounted() {
    mui('mui-numbox').numbox();
  },
  methods:{
    countChanged(){
      this.$emit("addCount",parseInt(this.$refs.numbox.value));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>