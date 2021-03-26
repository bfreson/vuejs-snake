<template>
<div :style="sceneStyle" class="scene">

    <Boardgame :width="board.width" :height="board.height" :top="board.top" :left="board.left"/>

</div>
    
</template>

<script>
import Boardgame from '@/components/Boardgame.vue';
export default {
  components: {
   Boardgame
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
          let top = this.borderWidth;
          let left = this.borderWidth;
          return {width,height,top,left};
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

.board {
    background-color: black;
    position: relative;
}
</style>
