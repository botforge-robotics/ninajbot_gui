<template>
  <div
    class="modal fade"
    id="infoModal"
    tabindex="-1"
    aria-labelledby="infoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" id="infoModalContent">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-bold" id="infoLabel">Info</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body d-flex flex-column align-items-center">
          <h1 class="text-start fs-3 text-muted w-100">Controls</h1>
            <div>
            <img
              id="joystick_img"
              src="@/assets/images/joystick_control.jpg"
              alt="joystick_control.png"
            />
          </div>
          <div class="d-flex w-50 flex-row justify-content-center mt-3">
            <div class="d-flex flex-column me-4">
              <p><strong>Zoom: </strong>CTRL + Mouse L click & drag.</p>
              <p><strong>Pan: </strong>SHIFT + Mouse L click & drag.</p>
            </div>
            <div class="d-flex flex-column" v-if="running_nav_node">
              <p>
                <strong>Goal Publish: </strong>Disable Pose estimate button,
                Mouse L click(position) & drag(Orientation).
              </p>
              <p>
                <strong>Pose Estimate: </strong>Enable Pose estimate button,
                Mouse L click(position) & drag(Orientation).
              </p>
            </div>

          </div>
          <h1 class="text-start text-muted fs-3 w-100">Log</h1>
          <logComp></logComp>
        </div>
        <div class="modal-footer">
          <button
            id="info_modal_close_btn"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logComp from "./LogComp.vue"
export default {
  data() {
    return {};
  },
components:{
    logComp
},
  mounted() {},

  methods: {},
};
</script>

<style scoped>
#infoModalContent {
  min-width: 65vw !important;
}
#infoModalContent > .modal-content > .modal-body {
  max-height: 80vh;
  overflow-y: scroll;
}
#joystick_img {
  width: 40vw;
}
</style>