<template>
  <div class="auxilary-page h-100">
    <jumbotron-Header title="Auxilaries"></jumbotron-Header>
    <div
      class="
        d-flex
        mt-4
        flex-row
        w-100
        justify-content-evenly
        align-items-start
      "
    >
      <div class="col-4">
        <div class="d-flex flex-column justify-content-between">
          <!-- EYES -->
          <!-- 
            neutral
            low_battery
            right
            left
            evil
            broad
        -->
          <div class="card mb-4">
            <div class="card-header">Eyes</div>
            <div class="card-body d-flex flex-column mb-3">
              <h5 class="card-title">Change eyes style</h5>
              <div
                class="btn-group mb-3"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="neutral_radio"
                  autocomplete="off"
                  checked
                  v-model="eyes"
                  value="neutral"
                  @change="publishEyes({ data: eyes })"
                />
                <label class="btn btn-outline-secondary" for="neutral_radio"
                  >Neutral</label
                >

                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="left_radio"
                  autocomplete="off"
                  v-model="eyes"
                  value="left"
                  @change="publishEyes({ data: eyes })"
                />
                <label class="btn btn-outline-secondary" for="left_radio"
                  >Left</label
                >
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="right_radio"
                  autocomplete="off"
                  v-model="eyes"
                  value="right"
                  @change="publishEyes({ data: eyes })"
                />
                <label class="btn btn-outline-secondary" for="right_radio"
                  >Right</label
                >
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="evil_radio"
                  autocomplete="off"
                  v-model="eyes"
                  value="evil"
                  @change="publishEyes({ data: eyes })"
                />
                <label class="btn btn-outline-secondary" for="evil_radio"
                  >Evil</label
                >
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="broad_radio"
                  autocomplete="off"
                  v-model="eyes"
                  value="broad"
                  @change="publishEyes({ data: eyes })"
                />
                <label class="btn btn-outline-secondary" for="broad_radio"
                  >Broad</label
                >
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="low_battery_radio"
                  autocomplete="off"
                  v-model="eyes"
                  value="low_battery"
                  @change="publishEyes({ data: eyes })"
                />
                <label class="btn btn-outline-secondary" for="low_battery_radio"
                  >Low battery</label
                >
              </div>
            </div>
          </div>
          <!-- LCD  -->
          <div class="card mb-4">
            <div class="card-header">Lcd</div>
            <div class="card-body">
              <h5 class="card-title">Set text content on 16x2 LCD</h5>
              <div class="input-group mb-3">
                <select
                  class="form-select"
                  style="max-width: 100px"
                  aria-label="Default select example"
                  v-model="lcdRow"
                >
                  <option value="0">Row 1</option>
                  <option value="1">Row 2</option>
                </select>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with dropdown button"
                  v-model="lcdMessage"
                  maxlength="16"
                  minlength="1"
                />
              </div>
              <button
                class="btn pub-btn"
                @click="publishLcd({ message: lcdMessage, row: lcdRow })"
              >
                Publish
              </button>
            </div>
          </div>
          <!-- Focus lights -->
          <div class="card mb-4">
            <div class="card-header">Focus Lights</div>
            <div class="card-body">
              <h5 class="card-title">Turn on/off focus light</h5>
              <div class="d-flex flex-row justify-content-left">
                <div class="form-check form-switch form-check-reverse">
                  <label class="form-check-label" for="leftFocusLed"
                    >Left:
                  </label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="leftFocusLed"
                    v-model="focusLightLeft"
                    @change="
                      publishFocuslights({
                        right: focusLightRight,
                        left: focusLightLeft,
                      })
                    "
                  />
                </div>

                <div class="form-check form-switch form-check-reverse ms-4">
                  <label class="form-check-label" for="rightFocusLed"
                    >Right:
                  </label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="rightFocusLed"
                    v-model="focusLightRight"
                    @change="
                      publishFocuslights({
                        right: focusLightRight,
                        left: focusLightLeft,
                      })
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card text-center" id="rgbCard">
          <div class="card-header">
            <div>RGB Led Strip</div>
            <ul class="nav nav-tabs card-header-tabs">
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
                      updateBodyStrip({ value: $event, target: 'front_left' })
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
                      updateBodyStrip({ value: $event, target: 'front_right' })
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
                      updateBodyStrip({ value: $event, target: 'rear_left' })
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
                      updateBodyStrip({ value: $event, target: 'rear_right' })
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
              <div class="d-flex flex-column justify-content-evenly w-100 h-100">
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
  </div>
</template>
  
<script>
import jumbotronHeader from "../components/jumbotronHeading.vue";
import rgbStrip from "../components/rgbStripComp.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  components: { jumbotronHeader, rgbStrip },
  computed: {
    ...mapGetters([
      "ros",
      "eyes_pub",
      "body_ws2812b",
      "left_ws2812b",
      "right_ws2812b",
    ]),
    eyes: {
      get() {
        return this.$store.getters.eyes;
      },
      set(value) {
        this.$store.commit("updateEyes", { data: value });
      },
    },
    focusLightLeft: {
      get() {
        return this.$store.getters.focusLight.left;
      },
      set(value) {
        this.$store.commit("updateFocusLight", {
          left: value,
          right: this.$store.getters.focusLight.right,
        });
      },
    },
    focusLightRight: {
      get() {
        return this.$store.getters.focusLight.right;
      },
      set(value) {
        this.$store.commit("updateFocusLight", {
          left: this.$store.getters.focusLight.left,
          right: value,
        });
      },
    },
    lcdRow: {
      get() {
        return this.$store.getters.lcd.row;
      },
      set(value) {
        this.$store.commit("updateLcd", {
          row: value,
          message: this.$store.getters.lcd.message,
        });
      },
    },
    lcdMessage: {
      get() {
        return this.$store.getters.lcd.message;
      },
      set(value) {
        this.$store.commit("updateLcd", {
          row: this.$store.getters.lcd.row,
          message: value,
        });
      },
    },
  },
  methods: {
    ...mapMutations([
      "publishEyes",
      "publishFocuslights",
      "publishLcd",
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
  mounted() {},
};
</script>
  
  
<style>
.auxilary-page {
  min-height: 100vh;
  padding: 20px;
  padding-top: 0;
}
button.nav-link {
  color: #f2771a;
}
button.nav-link.active {
  background-color: #f2771a !important;
  color: white !important;
}
button.nav-link.active:hover {
  color: white !important;
}
button.nav-link:hover {
  color: #8e8f91 !important;
}
.pub-btn {
  width: 100px;
  background-color: #f2771a !important;
  color: white !important;
}
.pub-btn:hover {
  background-color: #bd5404 !important;
  color: rgb(216, 216, 216) !important;
}
select:active {
  border: #bd5404;
  box-shadow: inset 0 1px 1px rgb(242, 119, 26), 0 0 8px rgb(242, 119, 26) !important;
}
select:focus {
  border: #bd5404;
  box-shadow: inset 0 1px 1px rgb(242, 119, 26), 0 0 8px rgb(242, 119, 26) !important;
}
#rgbCard {
  min-height: 897px;
}
</style>