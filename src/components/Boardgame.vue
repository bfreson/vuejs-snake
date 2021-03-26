<template>
    <div :style="{
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
    }" class="board">
     <Grid v-show="grid_visible" :width="width" :height="height" :top="0" :left="0"/>
     <Snake v-show="displaySnake" :width="width" :height="height" :top="0" :left="0"/>
</div>
    
</template>

<script>
import Grid from '@/components/Grid.vue';
import Snake from '@/components/Snake.vue';
import { mapState } from 'vuex'
export default {
  components: {
   Grid,
   Snake
  },
  computed:
  {
     ...mapState({
        grid_visible: state => state.grid_visible
  }),
   displaySnake() {
         return this.game_status !== "None";
     }
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
    position: absolute;
}
</style>
