<template>
  <div :style="{
       width: `${width}px`,
       height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
    }"  class="grid">
    <div class="row" v-for="y in gridHeight" :key="`row${y}`">
      <div  :style="{
      width: `${square.width}px`,
      height: `${square.height}px`,
    }" class="square" v-for="x in gridWidth" :key="`square${x}-${y}`">
        {{ y }}/{{ x }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  data() {
    return {
      gridWidth: 40,
      gridHeight: 40,
     
    };
  },
  computed:
  {
      square()
      {
           let width = this.width/this.gridWidth;
            let height = this.height/this.gridHeight;
          return {
            width,height
          };
       
      }
  },
  props:
  {
      width: Number,
      height: Number,
      top:Number,
      left:Number,

  }
};
</script>

<style scoped>
.grid {
  position: relative;
  z-index: 1;
  font-family: 'Trebuchet MS', Arial, sans-serif;
}
.row {
  display: flex;
}
.square {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4px;
}

.square {
  border: solid white 1px;
  color:white;
}
</style>
