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
    >
     <Grid v-show="grid_visible" :width="width" :height="height" :top="0" :left="0"/>
     <Snake v-show="displaySnake" :width="width" :height="height" :top="0" :left="0"/>
</div>
    
</template>

<script>
import Grid from '@/components/Grid.vue';
import Snake from '@/components/Snake.vue';
import { mapState } from 'vuex'
export default {
  components: {
   Grid,
   Snake
  },
  data () {
	return {
		interval: null
	}
},
methods: {
	StartInterval () {
		this.interval = setInterval(() => {
			  this.$store.dispatch('moveSnake');
		}, 400)
          this.$refs.board.focus();
	},
    StopInterval () {
	    clearInterval(this.interval)
	},
    move(orientation) {
         console.log(orientation);
         if(this.$store.state.game_status !== "Running") return;
         this.$store.commit('SET_SNAKE_ORIENTATION', orientation);
    },
},
beforeDestroy () {
	this.StopInterval();
},

  computed:
  {
     ...mapState({
        grid_visible: state => state.grid_visible
  }),
   displaySnake() {
         return this.game_status !== "None";
     }
   },
   watch:
   {
       '$store.state.game_status': function() {
           switch (this.$store.state.game_status)
           {
               case "Running":
                    this.StartInterval();
                    break;
                case "GameOver":
                   	this.StopInterval();
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
