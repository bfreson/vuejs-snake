<template>

<div :style="{
      width: `${width}px`,
      height: `${height}px`,
      top: '0px',
      left: '0px'
    }" class="start" v-hammer:tap="tap" >
    <div :style="{'background-color': menu.color }" 
         class="action" 
         ref="action"  
         @click="action" 
         v-on:keydown.esc="action()" 
        
         tabindex="0"
    >
        {{this.menu.message}}
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
    ...mapState(['width','height','game_status']),
    menu()
    {
        switch (this.game_status)
        {
           case 'GameOver':
            return {
              message : "Game Over :(",
              color : "red"
            }
           case 'Pause':
            return {
              message : "Pause",
              color : "yellow"
            }
          default:
            return {
              message : "Start new game",
              color : "orange"
            }
        }
      
    }
  },
  watch: {
   
  },
  methods: {
      action()
      {
        switch (this.game_status)
        {
           case 'GameOver':
           case 'None':
            this.$store.dispatch('startNewGame');
            break;
           case 'Pause':
            this.$store.dispatch('continue');
            break;
        }
      },
      tap(e) 
      {
        if (e.tapCount >1)
          this.action();
      }
  },
  mounted() {
    this.$refs.action.focus();
  }, 
  updated() {
    this.$refs.action.focus();
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
    width:min-content;
    overflow:hidden;
    white-space: nowrap;
    align-content: center;
    outline: none;
}
</style>