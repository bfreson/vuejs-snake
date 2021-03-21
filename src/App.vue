<template>

<div class="display"> 
  <div class="title py-3">
     <h1> VueJS - Snake</h1>
  </div>
  <GameStatus/>
   </div>

</template>

<script>
import GameStatus from '@/components/GameStatus.vue';

export default {
  components: {
   GameStatus
  },
  data() {
    return {
     
      
    };
  },
  computed: {
  
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
/* * {
  margin:0;
  padding:0;
  box-sizing: border-box;
} */
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
  width:800px;


  /* position: relative;
  display: inline-block; */
  font-family: pokemon;
}
</style>
