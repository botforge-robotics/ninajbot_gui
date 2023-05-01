<template>
  <div
    class="modal fade"
    id="ws2812bModal"
    tabindex="-1"
    aria-labelledby="ws2812bLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" id="ws2812bModalContent">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-bold" id="ws2812bLabel">Led Strip</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="col-12">
            <div class="card text-center" id="rgbCard">
              <div class="card-header">
                <div>RGB Led Strip</div>
                <ul class="nav nav-tabs nav-fill card-header-tabs">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="pills-customBody-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-customBody"
                      type="button"
                      role="tab"
                      aria-controls="pills-customBody"
                      aria-selected="true"
                    >
                      Custom Body
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-customLR-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-customLR"
                      type="button"
                      role="tab"
                      aria-controls="pills-customLR"
                      aria-selected="false"
                    >
                      Custom Left Right
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-preloaded-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-preloaded"
                      type="button"
                      role="tab"
                      aria-controls="pills-preloaded"
                      aria-selected="false"
                    >
                      Preloaded
                    </button>
                  </li>
                </ul>
              </div>
              <div class="card-body tab-content">
                <div
                  class="tab-pane fade show active w-100"
                  id="pills-customBody"
                  role="tabpanel"
                  aria-labelledby="pills-customBody-tab"
                  tabindex="0"
                >
                  <div class="d-flex flex-column justify-content-evenly w-100">
                    <div class="d-flex flex-row justify-content-evenly">
                      <rgb-strip
                        title="Front Left"
                        :config="body_ws2812b.front_left"
                        @updateStrip="
                          updateBodyStrip({
                            value: $event,
                            target: 'front_left',
                          })
                        "
                        :disable="body_ws2812b.global_anim"
                      ></rgb-strip>
                      <rgb-strip
                        title="Front"
                        :config="body_ws2812b.front"
                        @updateStrip="
                          updateBodyStrip({ value: $event, target: 'front' })
                        "
                        :disable="body_ws2812b.global_anim"
                      ></rgb-strip>
                      <rgb-strip
                        title="Front Right"
                        :config="body_ws2812b.front_right"
                        @updateStrip="
                          updateBodyStrip({
                            value: $event,
                            target: 'front_right',
                          })
                        "
                        :disable="body_ws2812b.global_anim"
                      ></rgb-strip>
                    </div>
                    <div class="d-flex flex-row justify-content-evenly">
                      <rgb-strip
                        title="Left"
                        :config="body_ws2812b.left"
                        @updateStrip="
                          updateBodyStrip({ value: $event, target: 'left' })
                        "
                        :disable="body_ws2812b.global_anim"
                      ></rgb-strip>
                      <rgb-strip
                        title="Body"
                        :config="body_ws2812b.body"
                        @updateStrip="
                          updateBodyStrip({ value: $event, target: 'body' })
                        "
                        :disable="!body_ws2812b.global_anim"
                      ></rgb-strip>
                      <rgb-strip
                        title="Right"
                        :config="body_ws2812b.right"
                        @updateStrip="
                          updateBodyStrip({ value: $event, target: 'right' })
                        "
                        :disable="body_ws2812b.global_anim"
                      ></rgb-strip>
                    </div>
                    <div class="d-flex flex-row justify-content-evenly">
                      <rgb-strip
                        title="Rear Left"
                        :config="body_ws2812b.rear_left"
                        @updateStrip="
                          updateBodyStrip({
                            value: $event,
                            target: 'rear_left',
                          })
                        "
                        :disable="body_ws2812b.global_anim"
                      ></rgb-strip>
                      <rgb-strip
                        title="Rear"
                        :config="body_ws2812b.rear"
                        @updateStrip="
                          updateBodyStrip({ value: $event, target: 'rear' })
                        "
                        :disable="body_ws2812b.global_anim"
                      ></rgb-strip>
                      <rgb-strip
                        title="Rear Right"
                        :config="body_ws2812b.rear_right"
                        @updateStrip="
                          updateBodyStrip({
                            value: $event,
                            target: 'rear_right',
                          })
                        "
                        :disable="body_ws2812b.global_anim"
                      ></rgb-strip>
                    </div>
                    <div class="d-flex flex-row justify-content-evenly">
                      <div class="form-check form-switch form-check-reverse">
                        <label
                          class="form-check-label fst-italic me-3"
                          for="fullStripAnim"
                          >Full Strip Animation:</label
                        >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          rgbCard
                          role="switch"
                          id="fullStripAnim"
                          v-model="body_ws2812b.global_anim"
                        />
                      </div>
                      <button
                        class="btn pub-btn"
                        @click="publishBodyStrip(body_ws2812b)"
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade w-100"
                  id="pills-customLR"
                  role="tabpanel"
                  aria-labelledby="pills-customBodyLR-tab"
                  tabindex="0"
                >
                  <div
                    class="d-flex flex-column justify-content-evenly w-100 h-100"
                  >
                    <div class="d-flex flex-row justify-content-evenly">
                      <rgb-strip
                        title="Left"
                        :config="left_ws2812b"
                        @updateStrip="updateLeftStrip($event)"
                        :disable="false"
                      ></rgb-strip>
                      <rgb-strip
                        title="Right"
                        :config="right_ws2812b"
                        @updateStrip="updateRightStrip($event)"
                        :disable="false"
                      ></rgb-strip>
                    </div>
                    <div class="d-flex flex-row justify-content-evenly">
                      <button
                        class="btn pub-btn"
                        @click="publishLeftStrip(left_ws2812b)"
                      >
                        Publish
                      </button>
                      <button
                        class="btn pub-btn"
                        @click="publishRightStrip(right_ws2812b)"
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade w-100"
                  id="pills-preloaded"
                  role="tabpanel"
                  aria-labelledby="pills-preloaded-tab"
                  tabindex="0"
                >
                  <div>Preloaded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            id="ws2812b_modal_close_btn"
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
import rgbStrip from "./rgbStripComp.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    rgbStrip,
  },
  computed: {
    ...mapGetters(["ros", "body_ws2812b", "left_ws2812b", "right_ws2812b"]),
  },
  mounted() {},

  methods: {
    ...mapMutations([
      "publishBodyStrip",
      "publishLeftStrip",
      "publishRightStrip",
      "updateLeftStrip",
      "updateRightStrip",
    ]),
    updateBodyStrip(data) {
      this.body_ws2812b[data.target] = { ...data.value };
      this.$store.commit("updateBodyStrip", this.body_ws2812b);
    },
  },
};
</script>

<style  scoped>
.pub-btn {
  width: 100px;
  background-color: #f2771a !important;
  color: white !important;
}
.pub-btn:hover {
  background-color: #bd5404 !important;
  color: rgb(216, 216, 216) !important;
}
#ws2812bModalContent {
  min-width: 50vw !important;
}
#ws2812bModalContent > .modal-content > .modal-body {
  max-height: 80vh;
  overflow-y: scroll;
}
</style>