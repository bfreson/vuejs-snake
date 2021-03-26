<template>
<div v-show="snake_squares!==undefined" :style="{
       width: `${width}px`,
       height: `${height}px`,
       top: `${top}px`,
       left: `${left}px`,
    }"  class="snake">
     <div :style="{
      width: `${item.width}px`,
      height: `${item.height}px`,
      top: `${item.top}px`,
      left: `${item.left}px`,
      'background-color': item.color
    }" class="snake-square" v-for="(item, index) in snake_squares" :key="`loc${index}`">
     
      </div>
       </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex';

export default {
    components: {
       
  },
  methods:
  {
    getSnakeSquare(index,column,row)
    {
      let color = (index === 0 ? 'red' : 'white');
      let pos_top = ((row-1) * this.square.height);
      let pos_left = ((column-1) * this.square.width);

      return {
        color: color,
        width: this.square.width,
        height: this.square.height,
        top: pos_top,
        left:pos_left
      }
    }
  },
  computed:
  {
        ...mapState({
        snake: state => state.snake}),
    ...mapGetters(['square']),
    snake_squares()
    {
        if(this.snake.location.length > 0)
        {
            let ret = this.snake.location.map((item, index) => {  return this.getSnakeSquare(index,item[0],item[1]);  });
            console.log(ret);
            return ret;
        }
         return null;

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
.snake{
    position: absolute;
}
.snake-square{
    position: absolute
}
</style>
