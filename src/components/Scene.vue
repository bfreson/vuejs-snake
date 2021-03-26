<template>
<div :style="sceneStyle" class="scene">

    <Boardgame :width="board.width" :height="board.height" :top="borderWidth" :left="borderWidth"/>
    <GameMenu v-show="displayMenu"/>
</div>
    
</template>

<script>
import Boardgame from '@/components/Boardgame.vue';
import GameMenu from '@/components/GameMenu.vue';
import {mapState,mapGetters} from 'vuex';

export default {
  components: {
   Boardgame,
   GameMenu
  },
  computed:
  {
      ...mapState(['width','height','borderWidth','game_status']),
      ...mapGetters(['board']),
      sceneStyle() {
        return {
            width: `${this.width}px`,
            height: `${this.height}px`,
            'background-color' : `rgb(${this.borderColor.r}, ${this.borderColor.g}, ${this.borderColor.b})`,
        };
     },
     displayMenu() {
         return this.game_status === "None";
     }
   
      
  },
  props:
  {
      borderColor: Object
  }
}
</script>

<style>

.scene {
    position: relative;
}
</style>
