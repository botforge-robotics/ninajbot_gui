<template>
    <div class="nts-page h-100">
      <jumbotron-Header title="Nodes,Topics&Services"></jumbotron-Header>
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
  .nts-page {
    min-height: 100vh;
    padding: 20px;
    padding-top: 0;
  }
  </style>