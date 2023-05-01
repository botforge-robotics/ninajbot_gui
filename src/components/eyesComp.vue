<template>
  <div class="btn-group dropup">
    <button
      type="button"
      class="btn btn_orange icon-btn"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style="margin-left: 25px"
    >
      <font-awesome-icon
        :icon="['fas', 'eye']"
        size="lg"
        style="color: #ffffff"
      />
    </button>
    <ul class="dropdown-menu">
      <li>
        <button
          class="dropdown-item"
          :class="{ active: this.eyes == 'neutral' }"
          type="button"
          @click="eyePublishClick('neutral')"
        >
          Neutral
        </button>
      </li>
      <li>
        <button
          class="dropdown-item"
          :class="{ active: this.eyes == 'left' }"
          type="button"
          @click="eyePublishClick('left')"
        >
          Left
        </button>
      </li>
      <li>
        <button
          class="dropdown-item"
          :class="{ active: this.eyes == 'right' }"
          type="button"
          @click="eyePublishClick('right')"
        >
          Right
        </button>
      </li>
      <li>
        <button
          class="dropdown-item"
          :class="{ active: this.eyes == 'evil' }"
          type="button"
          @click="eyePublishClick('evil')"
        >
          Evil
        </button>
      </li>
      <li>
        <button
          class="dropdown-item"
          :class="{ active: this.eyes == 'broad' }"
          type="button"
          @click="eyePublishClick('broad')"
        >
          Broad
        </button>
      </li>
      <li>
        <button
          class="dropdown-item"
          :class="{ active: this.eyes == 'low_battery' }"
          type="button"
          @click="eyePublishClick('low_battery')"
        >
          Low battery
        </button>
      </li>
    </ul>
  </div>

  <!-- EYES -->
  <!-- 
              neutral
              low_battery
              right
              left
              evil
              broad
          -->
</template>
    
  <script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters(["ros", "eyes_pub"]),
    eyes: {
      get() {
        return this.$store.getters.eyes;
      },
      set(value) {
        this.$store.commit("updateEyes", { data: value });
      },
    },
  },
  methods: {
    ...mapMutations(["publishEyes"]),
    eyePublishClick(type) {
      this.eyes = type;
      this.publishEyes({ data: this.eyes });
    },
  },
  mounted() {},
};
</script>
 <style>
</style>