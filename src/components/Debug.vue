<template>
    <div>
    <div class="button" @click="SetOrientation('Top')">TOP  </div>
     <div class="button" @click="SetOrientation('Right')">RIGHT  </div>
      <div class="button" @click="SetOrientation('Bottom')">BOTTOM  </div>
       <div class="button" @click="SetOrientation('Left')">LEFT  </div>
       <div class="button" @click="MoveSnake()">MOVE  </div>
        <div class="button" @click="SnakeGrows()">GROWS  </div>
    </div>
</template>

<script>

export default {
  components: {
  
  },
  data() {
    return {
           
    };
  },
 methods: {
      SetOrientation(orientation)
      {
           this.$store.commit('SET_SNAKE_ORIENTATION', orientation);
      },
       MoveSnake()
      {
           this.$store.dispatch('moveSnake');
      },
      SnakeGrows()
      {
           this.$store.dispatch('snakeGrows');
      }
    
  },
  created() {
   
  },
};
</script>

<style scoped>
.button
{
    cursor: pointer;
}
</style>