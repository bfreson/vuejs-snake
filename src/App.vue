<template>

<div :width="width" class="display"
  v-on:keydown.up="move('Top')"
        v-on:keydown.down="move('Bottom')"
        v-on:keydown.left="move('Left')"
        v-on:keydown.right="move('Right')"> 
  <div class="title py-3">
     <h1> VueJS - Snake</h1>
  </div>
  <GameStatus/>
  <Scene  :borderColor="{r:0, g:0, b:255}" />
 <Debug/>
   </div>

</template>

<script>
import GameStatus from '@/components/GameStatus.vue';
import Scene from '@/components/Scene.vue';
import Debug from '@/components/Debug.vue';
import {mapState} from 'vuex'

export default {
  components: {
   GameStatus,
   Scene,
   Debug
  },
  data() {
    return {
           
    };
  },
  computed: {
    ...mapState(['width','height','borderWidth']),
  },
  watch: {
   
  },
  methods: {
     move(orientation) {
         console.log(orientation);
        //  if(this.$store.game_status !== "Running") return;
        //  this.$store.commit('SET_SNAKE_ORIENTATION', orientation);
    },
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

   font-size:1rem !important;
  font-family: pokemon;
}
</style>
