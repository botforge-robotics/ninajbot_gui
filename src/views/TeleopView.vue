<template>
  <div class="home-page h-100">
    <jumbotron-Header title="Teleop"></jumbotron-Header>
    <div class="d-flex mt-4 flex-row w-100 text-center">
      <p class="col col-6 fs-3 fw-semibold  fst-italic">Camera Feed</p>
      <p class="col col-6 fs-3 fw-semibold  fst-italic">Control</p>
    </div>
    <div class="teleopConatiner">
      <div class="d-flex flex-row justify-content-center">
        <image-view class="col p-0 col-lg-6"></image-view>
        <joy-stick class="col col-lg-6 ps-3"></joy-stick>
      </div>
    </div>
  </div>
</template>

<script>
import imageView from "../components/imageView.vue";
import joyStick from "../components/joystickComp.vue";
import jumbotronHeader from "../components/jumbotronHeading.vue";
export default {
  data() {
    return {};
  },
  computed: {
  },
  components: {
    imageView,
    joyStick,
    jumbotronHeader,
  },
  methods: {},
 
};
</script>


<style>
.home-page {
  min-height: 100vh;
  padding: 20px;
  padding-top: 0;
}
</style>