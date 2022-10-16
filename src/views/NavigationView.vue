<template>
  <div class="navigation-page h-100">
    <jumbotron-Header title="Navigation"></jumbotron-Header>
    <h1 class="text-left">image feed</h1>
    <h1 class="text-left">maps</h1>
    <p>robo,laser,path,savr goal locations optins select</p>
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
.navigation-page {
  min-height: 100vh;
  padding: 20px;
  padding-top: 0;
}
</style>