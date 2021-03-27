<template>
<div  :style="{
       width: `${width}px`,
       height: `${height}px`,
       top: `${top}px`,
       left: `${left}px`,
    }"  class="egg">
     <div v-if="displayEgg" :style="{
      width: `${egg_square.width}px`,
      height: `${egg_square.height}px`,
      top: `${egg_square.top}px`,
      left: `${egg_square.left}px`
    }" class="egg-square">
     
      </div>
       </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex';

export default {
    components: {
       
  },
  computed:
  {
        ...mapState({
        egg: state => state.egg}),
    ...mapGetters(['square']),
    egg_square()
    {
        if(this.egg.location !== null)
        {
           let pos_left = ((this.egg.location[0] -1 ) * this.square.width);
           let pos_top = ((this.egg.location[1] -1) * this.square.height);
         
          return {
            width: this.square.width,
            height: this.square.height,
            top: pos_top,
            left: pos_left
          }
        }
         return null;

    },
    displayEgg()
    {
      return this.egg_square != null;
    }
  },props:
  {
      width: Number,
      height: Number,
      top:Number,
      left:Number,
  }
}
</script>
<style scoped>
.egg{
    position: absolute;
}
.egg-square{
    position: absolute;
    background-color: yellow;
    
}
</style>
