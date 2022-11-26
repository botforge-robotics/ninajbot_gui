<template>
  <div id="map"></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["ros"]),
  },
  mounted() {},
  unmounted() {},
};
</script>

<style>
#map {
  width: 700px;
  height: 525px;
  background-color: black;
}
@media screen and (max-width: 1024px) {
  #map {
    width: 800px;
    height: 600px;
  }
}
</style>