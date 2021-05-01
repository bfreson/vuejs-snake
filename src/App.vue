<template>

<div :width="width" class="display" > 
  <div :style="{
       'max-width': `${width}px`,
       'max-height': `120px`
    }">
      <div ref="title" class="title py-3">
        <h1> VueJS - Snake</h1>
      </div>
      <GameStatus ref="status" />
  </div>
  
  <Scene  :borderColor="{r:0, g:0, b:255}" />
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
    ...mapState(['width','height','borderWidth']),
  },
  watch: {
   
  },
  methods: {
    handleResize() {
      let newWidth = window.innerWidth;
      let newHeight = window.innerHeight - this.$refs.title.clientHeight - this.$refs.status.$el.clientHeight - 30;
      if (newHeight < newWidth) newWidth = newHeight;
      if (newWidth < newHeight) newHeight = newWidth;
      this.$store.commit('SET_WIDTH', newWidth );
      this.$store.commit('SET_HEIGHT', newHeight );
    }
  },
  mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
  },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
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
h1 {
    font-size: min(4vw,40px) !important;
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
  font-size: 1.4vmin !important;
  font-family: pokemon;
}
</style>
