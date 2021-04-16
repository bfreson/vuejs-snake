<template>
<div   :style="{
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
      'border-top-style': item.borderTop,
      'border-bottom-style': item.borderBottom,
      'border-left-style': item.borderLeft,
      'border-right-style': item.borderRight,
      'border-color': item.borderColor,
      'background-color': item.color,
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
    getSnakeSquare(index,item)
    {
      let color = (index === 0 ? 'red' : 'white');
      let pos_top = ((item[1]-1) * this.square.height);
      let pos_left = ((item[0]-1) * this.square.width);

      return {
        color: color,
        borderColor:'red',
        width: this.square.width,
        height: this.square.height,
        top: pos_top,
        left:pos_left,
        borderTop: item.borderTop,
        borderLeft: item.borderLeft,
        borderRight: item.borderRight,
        borderBottom: item.borderBottom
      }
    },
    setSnakeBorders(loc)
    {
      const borderStyle = 'solid';
      let locations = [...loc];

      for (let index = 0; index < locations.length; index++) {
        let currentBlock = locations[index];
        let previousBlock= (index === 0 ? null : locations[index-1]);
        let nextBlock = (index === locations.length-1 ? null : locations[index+1]);

        let borderTop = true;
        let borderBottom = true;
        let borderLeft = true;
        let borderRight = true;

        if(previousBlock !== null)
        {
          borderTop= this.haveBorderAt("Top",currentBlock,previousBlock);
          borderBottom= this.haveBorderAt("Bottom",currentBlock,previousBlock);
          borderLeft= this.haveBorderAt("Left",currentBlock,previousBlock);
          borderRight= this.haveBorderAt("Right",currentBlock,previousBlock);
        }
        if(nextBlock !== null)
        {
          borderTop= borderTop && this.haveBorderAt("Top",currentBlock, nextBlock);
          borderBottom= borderBottom && this.haveBorderAt("Bottom",currentBlock, nextBlock);
          borderLeft= borderLeft && this.haveBorderAt("Left",currentBlock, nextBlock);
          borderRight= borderRight && this.haveBorderAt("Right",currentBlock, nextBlock);
        }
        currentBlock.borderTop = (borderTop ? borderStyle : 'none');
        currentBlock.borderBottom = (borderBottom ? borderStyle : 'none');;
        currentBlock.borderLeft = (borderLeft ? borderStyle : 'none');;
        currentBlock.borderRight = (borderRight ? borderStyle : 'none');;
      }
      return locations;
    },
    haveBorderAt(location,blockA, blockB)
    {
      if (this.getBlockOrentiation(blockA,blockB) == location) return false;

      return true;
    }
    ,
    getBlockOrentiation(blockA, blockB)
    {
      if(blockA[0] === blockB[0])
      {
        if(blockA[1] -1  === blockB[1])
          return "Top";
        return "Bottom";
      }
      if(blockA[0] -1  === blockB[0])
        return "Left";
      return "Right";
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
          //let snakeLocations = Object.assign({}, this.snake.location);
          let snakeLocations = this.setSnakeBorders(this.snake.location);
          let snakeQuares = snakeLocations.map((item, index) => {  return this.getSnakeSquare(index,item);  });

            return snakeQuares;
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
    position: absolute;
    box-sizing: border-box;
    border-width: 1px;
}
</style>
