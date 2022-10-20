<template>
  <div
    class="col-3 overflow-auto ps-3"
    style="max-height: 400px"
    v-if="details.pubs.length > 0"
  >
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item"
        v-for="(pub, index) in details.pubs"
        :key="index"
      >
        {{ pub }}
      </li>
    </ul>
  </div>
  <div class="col-3 overflow-auto ps-3 text-center" style="max-height: 400px" v-else>
    No Publishers
  </div>
  <div
    class="col-3 overflow-auto ps-3 "
    style="max-height: 400px"
    v-if="details.subs.length > 0"
  >
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item"
        v-for="(sub, index) in details.subs"
        :key="index"
      >
        {{ sub }}
      </li>
    </ul>
  </div>
  <div class="col-3 overflow-auto ps-3 text-center" style="max-height: 400px" v-else>
    No Subscribers
  </div>
  <div
    class="col-3 overflow-auto ps-3"
    style="max-height: 400px"
    v-if="details.srvs.length > 0"
  >
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item"
        v-for="(srv, index) in details.srvs"
        :key="index"
      >
        {{ srv }}
      </li>
    </ul>
  </div>
  <div class="col-3 overflow-auto ps-3 text-center" style="max-height: 400px" v-else>
    No Services
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["ros"]),
  },
  methods: {},
};
</script>

<style>
</style>