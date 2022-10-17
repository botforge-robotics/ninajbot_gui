<template>
  <img id="map" />
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return{
    }
  },
  computed: {
    ...mapGetters(["ros"]),
  },
  mounted() {
   
  },
  unmounted() {
  },
};
</script>

<style>
#map {
  width: 640px;
  height: 480px;
  background-color: black;
}
</style>