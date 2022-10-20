<template>
  <div class="threeD-page h-100">
    <jumbotron-Header title="3D Model"></jumbotron-Header>
    <div id="urdf" class="d-flex flex-row justify-content-center"></div>
  </div>
</template>
  
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import jumbotronHeader from "../components/jumbotronHeading.vue";
export default {
  data() {
    return {
      urdfClient: null,
      tfClient:null,
      viewer:null
    };
  },
  components: {
    jumbotronHeader,
  },
  computed: {
    ...mapGetters(["ros"]),
  },
  methods: {},
  mounted() {
    // Create the main viewer.
    this.viewer = new ROS3D.Viewer({
      divID: "urdf",
      width: 1280,
      height: 720,
      antialias: true,
    });
    // Add a grid.
    this.viewer.addObject(new ROS3D.Grid());

    // Setup a client to listen to TFs.
    this.tfClient = new ROSLIB.TFClient({
      ros: this.ros,
      angularThres: 0.01,
      transThres: 0.01,
      rate: 10.0,
    });

    // Setup the URDF client.
    this.urdfClient = new ROS3D.UrdfClient({
      ros: this.ros,
      tfClient: this.tfClient,
      path: "http://localhost:8080/",
      rootObject: this.viewer.scene,
    });
  },
  unmounted(){
    this.tfClient.dispose();
    this.viewer.stop();
  }
};
</script>
  
  
  <style>
.threeD-page {
  min-height: 100vh;
  padding: 20px;
  padding-top: 0;
}
</style>