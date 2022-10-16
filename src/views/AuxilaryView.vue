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
            <div class="card-body">
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
                >
                  <option selected value="0">Row 1</option>
                  <option value="1">Row 2</option>
                </select>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with dropdown button"
                />
              </div>
              <button class="btn pub-btn">Publish</button>
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
                  id="pills-custom-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-custom"
                  type="button"
                  role="tab"
                  aria-controls="pills-custom"
                  aria-selected="true"
                >
                  Custom
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
              id="pills-custom"
              role="tabpanel"
              aria-labelledby="pills-custom-tab"
              tabindex="0"
            >
              <div class="d-flex flex-column justify-content-evenly w-100">
                <div class="d-flex flex-row justify-content-evenly">
                  <rgb-strip title="Front Left" :disable="fullAnim"></rgb-strip>
                  <rgb-strip title="Front" :disable="fullAnim"></rgb-strip>
                  <rgb-strip
                    title="Front Right"
                    :disable="fullAnim"
                  ></rgb-strip>
                </div>
                <div class="d-flex flex-row justify-content-evenly">
                  <rgb-strip title="Left" :disable="fullAnim"></rgb-strip>
                  <rgb-strip title="Body" :disable="!fullAnim"></rgb-strip>
                  <rgb-strip title="Right" :disable="fullAnim"></rgb-strip>
                </div>
                <div class="d-flex flex-row justify-content-evenly">
                  <rgb-strip title="Rear Left" :disable="fullAnim"></rgb-strip>
                  <rgb-strip title="Rear" :disable="fullAnim"></rgb-strip>
                  <rgb-strip title="Rear Right" :disable="fullAnim"></rgb-strip>
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
                      :disabled="disable"
                      v-model="fullAnim"
                    />
                  </div>
                  <button class="btn pub-btn">Publish</button>
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
export default {
  data() {
    return {
      fullAnim: false,
    };
  },
  components: { jumbotronHeader, rgbStrip },
  methods: {},
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