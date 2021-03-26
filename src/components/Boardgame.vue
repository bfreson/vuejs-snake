<template>
    <div :style="{
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
    }" class="board">
     <Grid v-show="grid_visible" :width="width" :height="height" :top="0" :left="0"/>

</div>
    
</template>

<script>
import Grid from '@/components/Grid.vue';
import { mapState } from 'vuex'
export default {
  components: {
   Grid
  },
  computed:
  {
     ...mapState({
        grid_visible: state => state.grid_visible
  }),
   },
   props:
  {
      width:Number,
      height:Number,
      top: Number,
      left: Number
  }
}
</script>

<style>
.board {
    background-color: black;
    position: relative;
}
</style>
