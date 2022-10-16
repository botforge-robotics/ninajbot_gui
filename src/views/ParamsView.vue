<template>
    <div class="params-page h-100">
      <jumbotron-Header title="Params"></jumbotron-Header>
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
  .params-page {
    min-height: 100vh;
    padding: 20px;
    padding-top: 0;
  }
  </style>