<template>
    <div tabindex="0" ref="board" :style="{
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
    }" class="board"
        v-on:keydown.up="move('Top')"
        v-on:keydown.down="move('Bottom')"
        v-on:keydown.left="move('Left')"
        v-on:keydown.right="move('Right')"
        v-on:keydown.esc="askPause()"
    >
     <Grid v-show="grid_visible" :width="width" :height="height" :top="0" :left="0"/>
     <Snake v-show="gameLaunched" :width="width" :height="height" :top="0" :left="0"/>
     <Egg v-show="gameLaunched" :width="width" :height="height" :top="0" :left="0"/>
</div>
    
</template>

<script>
import Grid from '@/components/Grid.vue';
import Snake from '@/components/Snake.vue';
import Egg from '@/components/Egg.vue';
import { mapState } from 'vuex'
export default {
  components: {
   Grid,
   Snake,
   Egg
  },
  data () {
	return {
		gameTimer: null,
        elapsedTimer: null
	}
},
methods: {
    pause(){
        this.stopGameTimer();
        this.stopElapsedInterval();
    },
    continue(){
        this.startGameTimer();
        this.startElapsedInterval();
    },
    startElapsedInterval(){
        this.elapsedTimer = setInterval(() => {
			  this.$store.commit('SET_ELAPSED_TIME',this.$store.state.elapsed_time +1);
		}, 1000)
    },
    stopElapsedInterval(){
        clearInterval(this.elapsedTimer)
    },
	startGameTimer () {
        this.gameTimer = setTimeout(() => {
              this.$store.dispatch('moveSnake');
              this.startGameTimer();
        }, this.getInterval());

        this.$refs.board.focus();
	},
    stopGameTimer () {
        clearTimeout(this.gameTimer);
	},
    getInterval()
    {
        return 300 - (this.$store.state.game_speed * 10); 
    },
    move(orientation) {
         if(this.$store.state.game_status !== "Running") return;
         this.$store.commit('SET_SNAKE_ORIENTATION', orientation);
    },
    askPause(){
         this.$store.dispatch('pause');
    }
},
mounted() {
     this.$store.dispatch('getScores');
},
beforeDestroy () {
	this.pause();
},
  computed:
  {
     ...mapState({
        grid_visible: state => state.grid_visible
  }),
   gameLaunched() {
         return this.game_status !== "None";
     }
   },
   watch:
   {
       '$store.state.game_status': function() {
           switch (this.$store.state.game_status)
           {
               case "Running":
                    this.continue();
                    break;
                case "GameOver":
                     this.$store.dispatch('saveScore',"bfr");
                case "Pause":
                   	this.pause();
                    break;
           }
  }
   },
   props:
  {
      width:Number,
      height:Number,
      top: Number,
      left: Number
  }
}
</script>

<style>
.board {
    background-color: black;
    position: absolute;
}
</style>
