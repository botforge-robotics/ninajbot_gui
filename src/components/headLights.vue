<template>
  <!-- Focus lights -->
  <button
      type="button"
      class="btn btn_orange icon-btn"
      :class="{'opacity-50':!focusLightRight}"
      style="margin-right: 25px"
      @click="lightPublish(!focusLightRight)"
    >
   
     <font-awesome-icon
        :icon="['fas', 'lightbulb']"
        size="lg"
        style="color: #ffffff"/>
        </button>
   
</template>
    
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  components: {  },
  computed: {
    ...mapGetters([
      "ros",
    ]),
  
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
  
  },
  methods: {
    ...mapMutations([
      "publishFocuslights",
    ]),
    lightPublish(val){
        this.focusLightLeft = val;
        this.focusLightRight = val;
        this.publishFocuslights({
          left: this.focusLightLeft,
          right: this.focusLightRight,
        });
    }
  },
  mounted() {},
};
</script>
    
    
 <style>

</style>