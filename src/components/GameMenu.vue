<template>

<div :style="{
      width: `${width}px`,
      height: `${height}px`,
      top: '0px',
      left: '0px'
    }" class="start">
    <div class="action" @click="startNewgame">
        Start new game
    </div>
</div>

</template>

<script>
import {mapState} from 'vuex'

export default {
  components: {
  
  },
  data() {
    return {
           
    };
  },
  computed: {
    ...mapState(['width','height']),
  },
  watch: {
   
  },
  methods: {
      startNewgame()
      {
          this.$store.dispatch('startNewGame');
      }
    
  },
  created() {
   
  },
};
</script>

<style scoped>
.start {
    
    color:blue;
    position: absolute;
    display: flex;
    align-items: center;
    z-index: 2;
    justify-content: space-around;
    backdrop-filter: blur(6px);
}
.action{
    cursor:pointer;
    background-color: orange;
    width:min-content;
    overflow:hidden;
    white-space: nowrap;
    align-content: center;
    
}
</style>