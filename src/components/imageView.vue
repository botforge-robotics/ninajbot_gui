<template>
  <img id="camera" />
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return{
        img_listner:null,
    }
  },
  computed: {
    ...mapGetters(["ros"]),
  },
  mounted() {
    this.img_listner= this.ros.Topic({
    ros: this.ros,
    name: "/ninjabot/camera/image_raw/compressed",
    messageType: "sensor_msgs/CompressedImage",
  }),
    this.img_listner.subscribe(function (m) {
      document.getElementById("camera").src = "data:image/jpg;base64," + m.data;
    });
  },
  unmounted() {
    this.img_listner.unsubscribe();
  },
};
</script>

<style>
#camera {
  width: 640px;
  height: 480px;
  background-color: black;
}
</style>