<template>
  <div class="card mb-4">
    <div class="card-header fs-4">Paramters <span class="badge bg-warning">{{ paramsList.paramsCount }}</span>
      <button
            type="button"
            class="btn btn_black text-white ms-4"
            @click="updateParams()"
          >
            Refresh
          </button>
    </div>
    <div class="card-body param_card_body">
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
          type="button"
          class="btn text-white btn-success icon-btn me-4"
          @click="updateParam(param.param)"
        >
          <font-awesome-icon
            :icon="['fas', 'upload']"
            size="lg"
            style="color: #ffffff"
          />
        </button>
        <button
          type="button"
          class="btn text-white btn-danger icon-btn "
          @click="deleteParam(param.param)"
        >
          <font-awesome-icon
            :icon="['fas', 'trash']"
            size="lg"
            style="color: #ffffff"
          />
        </button>
          
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["paramsList", "ros"]),
  },
  components: {},
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
.param_card_body{
  max-height:37vh;
  overflow-y: scroll;
}
</style>