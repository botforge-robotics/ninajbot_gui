<template>
    <div class="threeD-page h-100">
      <jumbotron-Header title="3D Model"></jumbotron-Header>
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
  .threeD-page {
    min-height: 100vh;
    padding: 20px;
    padding-top: 0;
  }
  </style>