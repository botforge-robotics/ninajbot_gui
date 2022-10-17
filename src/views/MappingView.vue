<template>
  <div class="mapping-page h-100">
    <jumbotron-Header title="Mapping"></jumbotron-Header>
    <div class="d-flex mt-4 flex-row w-100 text-center align-items-center">
      <p class="col-4 fs-3 fw-semibold fst-italic" style="width: 520px">
        Camera Feed
      </p>
      <p class="col-4 fs-3 fw-semibold fst-italic">Control</p>
      <p class="col-4 fs-3 fw-semibold fst-italic" style="width: 640px">Map</p>
    </div>
    <div class="teleopConatiner">
      <div class="d-flex flex-row justify-content-evenly align-items-center">
        <image-view class="col-4 p-0"></image-view>
        <joy-stick class="col-4 ps-3"></joy-stick>
        <map-view class="col-4 p-0"></map-view>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import imageView from "../components/imageView.vue";
import joyStick from "../components/joystickComp.vue";
import jumbotronHeader from "../components/jumbotronHeading.vue";
import {mapGetters} from "vuex";
import mapView from "../components/mapComp.vue";
// import {Viewer,OccupancyGridClient} from "../helper/ros2d";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["ros"]),
  },
  components: {
    imageView,
    joyStick,
    jumbotronHeader,
    mapView,
  },
  methods: {},
  mounted() {
    // Create the main viewer.
    var viewer = new ROS3D.Viewer({
      divID: "map",
      width: 640,
      height: 480,
      antialias : true
    });

    // Setup the map client.
    var gridClient =  new ROS3D.OccupancyGridClient({
      ros: this.ros,
      rootObject: viewer.scene,
      continuous: true
    });
    // Scale the canvas to fit to the map
    gridClient.on("change", function () {
      viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
      viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
    });
  },
};
</script>


<style scoped>
.mapping-page {
  min-height: 100vh;
  padding: 20px;
  padding-top: 0;
}
.tab-content {
  min-height: 330px;
}
.tab-pane {
  min-height: 330px;
}
#zone_joystick {
  min-height: 330px;
}
#camera {
  max-width: 480px;
  max-height: 360px;
}
</style>