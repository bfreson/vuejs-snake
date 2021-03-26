<template>
  <div :style="{
       width: `${width}px`,
       height: `${height}px`,
       top: `${top}px`,
       left: `${left}px`,
    }"  class="grid">
    <div class="row" v-for="y in rows" :key="`row${y}`">
      <div  :style="{
      width: `${square.width}px`,
      height: `${square.height}px`,
    }" class="square" v-for="x in columns" :key="`square${x}-${y}`">
        <!-- {{ y }}/{{ x }} -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Grid',
  data() {
    return {
     
    };
  },
  computed:
  {
    ...mapState(['columns','rows']),
    ...mapGetters(['square']),
      
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
  font-size: 8px;
    border: solid white 1px;
  color:white;
}


</style>
