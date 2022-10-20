<template>
  <div class="params-page">
    <jumbotron-Header title="Params"></jumbotron-Header>
    <div class="mt-4">
      <div class="rounded-pill fs-4 bg-dark text-bg-dark ps-4 pe-4 pt-2 pb-2">
        Params
        <span class="badge bg-warning">{{ paramsList.paramsCount }}</span>
      </div>
      <div
        class="d-flex flex-row justify-content-center mt-2"
        v-for="(param, index) in paramsList.params"
        :key="index"
      >
        <div class="col-4">
          <p>{{ param.param }}</p>
        </div>
        <div class="col-3">
          <input class="form-control" :id="param.param" :value="param.value" />
        </div>
        <div class="col-4 d-flex flex-row justify-content-center">
          <button
            class="btn btn-success me-5"
            @click="updateParam(param.param)"
          >
            Update
          </button>
          <button class="btn btn-danger" @click="deleteParam(param.param)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapActions, mapGetters } from "vuex";
import jumbotronHeader from "../components/jumbotronHeading.vue";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["paramsList", "ros"]),
  },
  components: {
    jumbotronHeader,
  },
  methods: {
    ...mapActions(["updateParamsListAction"]),
    updateParam(param) {
      let temp_param = this.ros.Param({
        ros: this.ros,
        name: param,
      });
      temp_param.set(String(document.getElementById(param).value));
      this.updateParamsListAction();
    },
    deleteParam(param) {
      let temp_param = this.ros.Param({
        ros: this.ros,
        name: param,
      });
      temp_param.delete();
      this.updateParamsListAction();
    },
    updateParams() {
      this.updateParamsListAction();
    },
  },
  mounted() {
    this.updateParams();
  },
};
</script>
  
  
  <style>
.params-page {
  min-height: 100vh;
  padding: 20px;
  padding-top: 0;
}
</style>