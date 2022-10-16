<template>
    <div class="log-page h-100">
      <jumbotron-Header title="Log"></jumbotron-Header>
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
  .log-page {
    min-height: 100vh;
    padding: 20px;
    padding-top: 0;
  }
  </style>