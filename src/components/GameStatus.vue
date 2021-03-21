<template>
<div class="container">
<div class="row mt-2">
    <div class="score ml-1 col ">
        Current score: {{current_score}}
    </div>
        <div class="score mr-1 col
        d-flex justify-content-end ">
         Best score: {{best_score}}
    </div>

</div>
</div>



</template>

<script>
export default {
  computed: {
    current_score() {
      return this.$store.getters.current_score;
    },
     best_score() {
      return this.$store.getters.best_score;
    },
  },
};
</script>

<style scoped>
.score {
    font-size:1.2rem !important;
}
</style>
