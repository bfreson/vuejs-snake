<template>
<div class="container">
<div class="row mt-1 mb-1">
    <div class="score ml-1 col ">
        Current score: {{current_score}}
    </div>
     <div class="mr-1 col
        d-flex justify-content-center ">
         {{elapsed_time}}
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
    elapsed_time() {
      return this.$store.getters.elapsed_time;
    }
  },
};
</script>

<style scoped>

</style>
