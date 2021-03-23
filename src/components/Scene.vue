<template>
<div :style="sceneStyle" class="scene">

    <div :style="{
      width: `${board.width}px`,
      height: `${board.height}px`,
      top: `${borderWidth}px`,
      left: `${borderWidth}px`,
    }" class="board">


    </div>
     <Grid :width="board.width" :height="board.height" :top="grid.top" :left="grid.left"/>

</div>
    
</template>

<script>
import Grid from '@/components/Grid.vue';
export default {
  components: {
   Grid
  },
  computed:
  {
      sceneStyle() {
        return {
            width: `${this.width}px`,
            height: `${this.height}px`,
            'background-color' : `rgb(${this.borderColor.r}, ${this.borderColor.g}, ${this.borderColor.b})`,
        };
    },
      board()
      {
          let width = this.width -(2*this.borderWidth);
          let height = this.height -(2*this.borderWidth);
          return {width,height};
      }
      ,
      grid()
      {
          let top = 0 +this.borderWidth - this.board.width;
          let left = this.borderWidth;
           return {top,left};
      }
  },
  props:
  {
      width:Number,
      height:Number,
      borderWidth: Number,
      borderColor: Object
  }
}
</script>

<style>


/* .scene {

    background-color: rgb(202, 202, 46);
} */
.board {
    /* width:600px;
    height:600px; */
    background-color: black;
    position: relative;
    /* top: 25px;
    left: 25px; */
}
</style>
