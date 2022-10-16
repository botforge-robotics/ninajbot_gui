<template>
  <div
    class="d-flex flex-column align-items-start justify-content-between mb-5"
    style="height: 185px"
  >
    <p class="card-title badge" :class="{'bg-dark':title=='Body','bg-secondary':title!='Body'}">{{ title }}</p>
    <div class="d-flex flex-row align-items-center">
      <label for="color" class="form-label me-3 fst-italic">Color: </label>
      <input
        type="color"
        class="form-control form-control-color"
        id="color"
        value="#563d7c"
        title="Choose your color"
        :disabled="disable"
      />
    </div>
    <div class="d-flex flex-row align-items-center">
      <label for="time" class="form-label me-3 fst-italic">Time: </label>
      <select
        class="form-select"
        style="max-width: 100px"
        aria-label="time"
        :disabled="disable"
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
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>