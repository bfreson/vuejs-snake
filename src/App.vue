<template>

<div class="display"> 
  <div class="title py-3">
     <h1> VueJS - Snake</h1>
  </div>
  <GameStatus/>
  <Scene :width="board.width" :height="board.height" :borderColor="{r:0, g:0, b:255}" :borderWidth="15"/>
 
   </div>

</template>

<script>
import GameStatus from '@/components/GameStatus.vue';
import Scene from '@/components/Scene.vue';
import {mapState} from 'vuex'

export default {
  components: {
   GameStatus,
   Scene,
  },
  data() {
    return {
           
    };
  },
  computed: {
    ...mapState({
        board: state => state.board
  }),
  },
  watch: {
   
  },
  methods: {
    
  },
  created() {
   
  },
};
</script>

<style>
* {
  padding: 0 0 0 0 !important;
  margin: 0 0 0 0 !important;
}
body{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
}
.title{
  background-color: blue;
  text-align: center;
  color: orange;
}
@font-face {
  font-family: pokemon;
  src: url(/fonts/pokemon-font.woff);
}

.display {
  width:650px;
   font-size:1rem !important;
  font-family: pokemon;
}
</style>
