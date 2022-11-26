<template>
  <div id="joyStickContainer">
    <ul class="nav nav-pills mb-3 nav-fill" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="pills-analog-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-analog"
          type="button"
          role="tab"
          aria-controls="pills-analog"
          aria-selected="true"
          @click="showVelSlider = true"
        >
          Analog
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-buttons-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-buttons"
          type="button"
          role="tab"
          aria-controls="pills-buttons"
          aria-selected="false"
          @click="showVelSlider = true"
        >
          Buttons
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-joy-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-joy"
          type="button"
          role="tab"
          aria-controls="pills-joy"
          aria-selected="false"
          @click="showVelSlider = false"
        >
          Joy stick
        </button>
      </li>
    </ul>
    <div class="tab-content w-100" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-analog"
        role="tabpanel"
        aria-labelledby="pills-analog-tab"
        tabindex="0"
      >
        <div id="zone_joystick"></div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-buttons"
        role="tabpanel"
        aria-labelledby="pills-buttons-tab"
        tabindex="0"
      >
        <div class="d-flex flex-column justify-content-center">
          <div class="d-flex flex-row justify-content-center">
            <button
              class="btn shadow arrow-btn"
              @mousedown="publishVel({ linear: max_linear_vel, angular: 0.0 })"
              @mouseup="publishVel({ linear: 0.0, angular: 0.0 })"
              @touchstart="publishVel({ linear: max_linear_vel, angular: 0.0 })"
              @touchend="publishVel({ linear: 0.0, angular: 0.0 })"
            >
              &#8593;
            </button>
          </div>
          <div class="d-flex flex-row justify-content-center">
            <button
              class="btn shadow arrow-btn"
              @mousedown="publishVel({ linear: 0.0, angular: max_angular_vel })"
              @mouseup="publishVel({ linear: 0.0, angular: 0.0 })"
              @touchstart="
                publishVel({ linear: 0.0, angular: max_angular_vel })
              "
              @touchend="publishVel({ linear: 0.0, angular: 0.0 })"
            >
              &#8592;
            </button>
            <button
              class="btn shadow arrow-btn"
              @mousedown="publishVel({ linear: -max_linear_vel, angular: 0.0 })"
              @mouseup="publishVel({ linear: 0.0, angular: 0.0 })"
              @touchstart="
                publishVel({ linear: -max_linear_vel, angular: 0.0 })
              "
              @touchend="publishVel({ linear: 0.0, angular: 0.0 })"
            >
              &#8595;
            </button>
            <button
              class="btn shadow arrow-btn"
              @mousedown="
                publishVel({ linear: 0.0, angular: -max_angular_vel })
              "
              @mouseup="publishVel({ linear: 0.0, angular: 0.0 })"
              @touchstart="
                publishVel({ linear: 0.0, angular: -max_angular_vel })
              "
              @touchend="publishVel({ linear: 0.0, angular: 0.0 })"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-joy"
        role="tabpanel"
        aria-labelledby="pills-joy-tab"
        tabindex="0"
      >
        <div>
          <img
            id="joystick_img"
            style="width: 95%"
            src="@/assets/images/joystick_control.jpg"
            alt="joystick_control.png"
          />
        </div>
      </div>
    </div>
    <div class="d-flex flex-row justify-content-evenly" v-if="showVelSlider">
      <div class="w-50 ms-5 me-5">
        <label
          for="max_linear_vel"
          class="
            form-label
            fs-6
            fw-semibold
            fst-italic
            d-flex
            align-items-center
          "
          >Max Linear Velocity:
          <p class="ms-2 fs-5 fw-bold mb-0">
            {{ max_linear_vel }}<span class="text-muted"> m/s.</span>
          </p></label
        >
        <input
          type="range"
          class="form-range"
          :min="min_allowed_linear_vel"
          :max="max_allowed_linear_vel"
          step="0.05"
          id="max_linear_vel"
          :value="max_linear_vel"
          @change="set_max_linear_vel($event.target.value)"
        />
      </div>

      <div class="w-50 ms-5 me-5">
        <label
          for="max_angular_vel"
          class="
            form-label
            fs-6
            fw-semibold
            fst-italic
            d-flex
            align-items-center
          "
          >Max Angular Velocity:
          <p class="ms-2 fs-5 fw-bold mb-0">
            {{ max_angular_vel }} <span class="text-muted"> rad/s.</span>
          </p></label
        >
        <input
          type="range"
          class="form-range"
          :min="min_allowed_angular_vel"
          :max="max_allowed_angular_vel"
          step="0.05"
          id="max_angular_vel"
          :value="max_angular_vel"
          @change="set_max_angular_vel($event.target.value)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      manager: null,
      linear_speed: 0.0,
      angular_speed: 0.0,
      timer: null,
      showVelSlider: true,
    };
  },
  computed: {
    ...mapGetters([
      "max_linear_vel",
      "max_angular_vel",
      "max_allowed_linear_vel",
      "max_allowed_angular_vel",
      "min_allowed_linear_vel",
      "min_allowed_angular_vel",
    ]),
  },
  methods: {
    ...mapMutations([
      "publishVel",
      "set_max_linear_vel",
      "set_max_angular_vel",
    ]),
  },
  mounted() {
    let vm = this;
    // declare nipple
    this.manager = require("nipplejs").create({
      zone: document.getElementById("zone_joystick"),
      color: "#F2771A",
      threshold: 0.1,
      mode: "static",
      size: 150,
      position: { left: 50 + "%", top: 50 + "%" },
    });
    // on nipple move start
    this.manager.on("start", function () {
      vm.timer = setInterval(function () {
        vm.publishVel({ linear: vm.linear_speed, angular: vm.angular_speed });
      }, 80);
    });
    //on nipple move end
    this.manager.on("end", function () {
      if (vm.timer) {
        clearInterval(vm.timer);
      }
      vm.publishVel({ linear: 0, angular: 0 });
    });
    // on nipple moving
    this.manager.on("move", function (event, nipple) {
      var max_distance = 75.0; // pixels;
      vm.linear_speed =
        (Math.sin(nipple.angle.radian) * vm.max_linear_vel * nipple.distance) /
        max_distance;
      vm.angular_speed =
        (-Math.cos(nipple.angle.radian) *
          vm.max_angular_vel *
          nipple.distance) /
        max_distance;
    });
  },
  unmounted() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.tab-content {
  min-height: 360px;
}
.tab-content > .active {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
.tab-pane {
  min-height: 360px;
}

#zone_joystick {
  position: relative;
  min-height: 360px;
}
button.nav-link {
  color: #f2771a;
}
button.nav-link.active {
  background-color: #f2771a !important;
}
button.nav-link.active:hover {
  color: white !important;
}
button.nav-link:hover {
  color: #8e8f91 !important;
}
.arrow-btn {
  width: 100px;
  height: 100px;
  margin: 15px;
  background-color: #f2771a !important;
  color: white !important;
  font-size: 40px !important;
}
.arrow-btn:hover {
  background-color: #bd5404 !important;
  color: rgb(216, 216, 216) !important;
}

.form-range:focus::-webkit-slider-thumb {
  background-color: #f2771a;
  box-shadow: 0px 0px 3px 3px rgba(242, 119, 26, 0.72) !important;
}
.form-range::-webkit-slider-thumb {
  background-color: #f2771a !important;
}
label p {
  color: #f2771a;
}
#zone_joystick {
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 1024px) {
  .arrow-btn {
    width: 80px;
    height: 80px;
    font-size: 30px !important;
  }
  .tab-content {
    min-height: 260px;
  }
  .tab-pane {
    min-height: 260px;
  }
  #zone_joystick {
    position: relative;
    min-height: 260px;
  }
  #joystick_img {
    width: 45vw;
  }
  .form-label {
    font-size: 12.5px !important;
  }
  .form-label p {
    font-size: 15px !important;
  }
}
</style>