<template>
  <div class="log-page h-100">
    <jumbotron-Header title="Log"></jumbotron-Header>
    <div class="mt-3 w-100">
      <div
        class="alert"
        :class="{
          'alert-info': log.level == 1,
          'alert-success': log.level == 2,
          'alert-warning': log.level == 3,
          'alert-danger': log.level == 4,
          'alert-secondary': log.level == 5,
          'alert-primary': log.level > 5,
        }"
        v-for="(log, index) in logs"
        :key="index"
      >
        <strong>{{ log.secs }}: </strong
        ><span class="fst-italic">{{ log.name + " > " }} </span
        ><span class="fw-bold">{{ log.msg + " > " }}</span
        ><span class="text-decoration-underline">{{ log.file }}</span>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";
import jumbotronHeader from "../components/jumbotronHeading.vue";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["logs"]),
  },
  components: {
    jumbotronHeader,
  },
  methods: {},
  mounted() {},
};
</script>
  
  
  <style>
.log-page {
  min-height: 100vh;
  padding: 20px;
  padding-top: 0;
}
</style>