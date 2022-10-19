<template>
  <div
    class="d-flex flex-column align-items-start justify-content-between mb-5"
    style="height: 185px"
  >
    <p
      class="card-title badge"
      :class="{ 'bg-dark': title == 'Body', 'bg-secondary': title != 'Body' }"
    >
      {{ title }}
    </p>
    <div class="d-flex flex-row align-items-center">
      <label for="color" class="form-label me-3 fst-italic">Color: </label>
      <input
        type="color"
        class="form-control form-control-color"
        id="color"
        :value="
          hslToHex(
            getScaledValue(configLocal.h, 0, 1530, 0, 360),
            getScaledValue(configLocal.s, 0, 255, 0, 100),
            getScaledValue(configLocal.v, 0, 255, 0, 50)
          )
        "
        title="Choose color"
        :disabled="disable"
        @change="changeColor"
      />
    </div>
    <div class="d-flex flex-row align-items-center">
      <label for="time" class="form-label me-3 fst-italic">Time: </label>
      <select
        class="form-select"
        style="max-width: 100px"
        aria-label="time"
        :disabled="disable"
        v-model="configLocal.t"
        @change="update"
      >
        <option v-for="index in 20" :key="index" :value="index">
          {{ index }}
        </option>
      </select>
    </div>
    <div class="d-flex flex-row align-items-center">
      <label for="anim" class="form-label me-3 fst-italic">Animation: </label>
      <select
        class="form-select"
        style="max-width: 150px"
        aria-label="animation"
        :disabled="disable"
        v-model="configLocal.animation"
        @change="update"
      >
        <option selected value="1">Steady</option>
        <option value="2">Dimming</option>
        <option value="3">Flow and cut</option>
        <option value="4">Hue flow</option>
        <option value="5">Rainbow Flow</option>
      </select>
    </div>
    <div class="form-check form-switch form-check-reverse">
      <label class="form-check-label fst-italic me-3" for="reverse"
        >Flow reverse:</label
      >
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="reverse"
        :disabled="disable"
        v-model="configLocal.reverse"
        @change="update"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      configLocal: { ...this.config },
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    disable: {
      type: Boolean,
      default: false,
      required: true,
    },
    config: {
      required: true,
    },
  },
  methods: {
    update() {
      this.configLocal.animation = parseInt(this.configLocal.animation);
      this.configLocal.t = parseInt(this.configLocal.t);
      this.$emit("updateStrip", this.configLocal);
    },
    hexToHSL(H) {
      // Convert hex to RGB first
      let r = 0,
        g = 0,
        b = 0;
      if (H.length === 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
      } else if (H.length === 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
      }
      // Then to HSL
      r /= 255;
      g /= 255;
      b /= 255;
      let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

      if (delta === 0) h = 0;
      else if (cmax === r) h = ((g - b) / delta) % 6;
      else if (cmax === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;

      h = Math.round(h * 60);

      if (h < 0) h += 360;

      l = (cmax + cmin) / 2;
      s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      s = +(s * 100).toFixed(1);
      l = +(l * 100).toFixed(1);

      return `${h},${s},${l}`;
    },
    hslToHex(h, s, l) {
      l /= 100;
      const a = (s * Math.min(l, 1 - l)) / 100;
      const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
          .toString(16)
          .padStart(2, "0"); // convert to Hex and prefix "0" if needed
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    },
    getScaledValue(
      value,
      sourceRangeMin,
      sourceRangeMax,
      targetRangeMin,
      targetRangeMax
    ) {
      var targetRange = targetRangeMax - targetRangeMin;
      var sourceRange = sourceRangeMax - sourceRangeMin;
      return (
        ((value - sourceRangeMin) * targetRange) / sourceRange + targetRangeMin
      );
    },

    changeColor(event) {
      let hsv = String(this.hexToHSL(event.target.value)).split(",");
      this.configLocal.h = parseInt(
        this.getScaledValue(parseInt(hsv[0]), 0, 360, 0, 1530)
      );
      this.configLocal.s = parseInt(
        this.getScaledValue(parseInt(hsv[1]), 0, 100, 0, 255)
      );
      this.configLocal.v = parseInt(
        this.getScaledValue(parseInt(hsv[2]), 0, 50, 0, 255)
      );
      this.configLocal.v = this.configLocal.v > 255 ? 255 : this.configLocal.v;
      this.update();
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style>
</style>