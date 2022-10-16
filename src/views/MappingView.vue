<template>
  <div class="mapping-page h-100">
    <jumbotron-Header title="Mapping"></jumbotron-Header>
    <h1 class="text-left">image feed</h1>
    <h1 class="text-left">maps</h1>
    <p>robo,laser optins select</p>
    <h1 class="text-left">control</h1>
    <h1 class="text-left">start stop save map</h1>
  </div>
</template>

<script>
import jumbotronHeader from '../components/jumbotronHeading.vue';
export default {
  data() {
    return {};
  },
  components: {
    jumbotronHeader
  },
  methods: {},
  mounted() {},
};
</script>


<style>
.mapping-page {
  min-height: 100vh;
  padding: 20px;
  padding-top: 0;
}
</style>