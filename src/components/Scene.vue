<template>
<div :style="sceneStyle" class="scene">

    <Boardgame :width="board.width" :height="board.height" :top="borderWidth" :left="borderWidth"/>

</div>
    
</template>

<script>
import Boardgame from '@/components/Boardgame.vue';
import {mapState,mapGetters} from 'vuex';

export default {
  components: {
   Boardgame
  },
  computed:
  {
      ...mapState(['width','height','borderWidth']),
      ...mapGetters(['board']),
      sceneStyle() {
        return {
            width: `${this.width}px`,
            height: `${this.height}px`,
            'background-color' : `rgb(${this.borderColor.r}, ${this.borderColor.g}, ${this.borderColor.b})`,
        };
    },
   
      
  },
  props:
  {
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
