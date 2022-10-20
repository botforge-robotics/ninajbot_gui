<template>
  <div class="nts-page h-100">
    <jumbotron-Header
      class="mb-2"
      title="Nodes, Topics & Services"
    ></jumbotron-Header>
    <!-- NODES -->
    <div>
      <div class="rounded-pill fs-4 bg-dark text-bg-dark ps-4 pe-4 pt-2 pb-2">
        Nodes:
        <span class="badge bg-warning">{{ nodesList.nodesCount }}</span>
      </div>
      <div
        class="d-flex flex-row justify-content-evenly align-items-center mt-2"
      >
        <p class="col-3 text-center fs-5 fw-bold text-muted">Nodes</p>
        <p class="col-3 text-center fs-5 fw-bold text-muted">Publishers</p>
        <p class="col-3 text-center fs-5 fw-bold text-muted">Subscribers</p>
        <p class="col-3 text-center fs-5 fw-bold text-muted">Services</p>
      </div>
      <div class="d-flex flex-row justify-content-evenly">
        <div
          class="list-group col-3 mt-3 overflow-auto"
          style="max-height: 400px"
        >
          <button
            type="button"
            class="list-group-item list-group-item-action"
            aria-current="true"
            v-for="(node, index) in nodesList.nodes"
            :key="index"
            @click="nodesListindex = index"
            :class="{ active: nodesListindex == index }"
          >
            <p class="fs-6">{{ node.node }}</p>
          </button>
        </div>
        <node-details
          :details="nodesList.nodes[nodesListindex]"
          v-if="nodesList.nodes.length > 0"
        ></node-details>
        <div v-else class="col-9">No Publishers Subscribers & services</div>
      </div>
    </div>
   
    <div class="d-flex flex-row">
       <!-- TOPICS -->
    <div class="mt-4 col-6 pe-2">
      <div class="rounded-pill fs-4 bg-dark text-bg-dark ps-4 pe-4 pt-2 pb-2">
        Topics:
        <span class="badge bg-warning">{{ topicsList.topicsCount }}</span>
      </div>
      <ul
        class="list-group list-group-flush overflow-auto  mt-3"
        style="max-height: 400px"
      >
        <li
          class="list-group-item"
          v-for="(topic, index) in topicsList.topics"
          :key="index"
        >
          {{ topic.topic }} <span class="text-muted">({{ topic.msgTyp }})</span>
        </li>
      </ul>
      <!-- <p>getTopicsForType</p> -->
      <!-- <p>subscribe unsubscribe</p> -->
    </div>
    <!-- SERVICES -->
    <div class="mt-4 col-6 ps-2">
      <div class="rounded-pill fs-4 bg-dark text-bg-dark ps-4 pe-4 pt-2 pb-2">
        Services:
        <span class="badge bg-warning">{{ servicesList.servicesCount }}</span>
      </div>
      <ul
        class="list-group list-group-flush overflow-auto  mt-3"
        style="max-height: 400px"
      >
        <li
          class="list-group-item"
          v-for="(service, index) in servicesList.services"
          :key="index"
        >
          {{ service.service }}
          <span class="text-muted">({{ service.srvType }})</span>
        </li>
      </ul>
    </div>
    </div>
    <!-- <p>getServiceRequestDetails</p> -->
    <!-- <p>getServiceResponseDetails</p> -->

    <!-- ACTIONS -->
    <div class="mt-4 w-50">
      <div class="rounded-pill fs-4 bg-dark text-bg-dark ps-4 pe-4 pt-2 pb-2">
        Action Servers:
        <span class="badge bg-warning">{{ actionsServersList.serversCount }}</span>
      </div>
      <ul
        class="list-group list-group-flush overflow-auto mt-3"
        style="max-height: 400px"
      >
        <li
          class="list-group-item"
          v-for="(server, index) in actionsServersList.servers"
          :key="index"
        >
          {{ server.server }}
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script>
import jumbotronHeader from "../components/jumbotronHeading.vue";
import { mapActions, mapGetters } from "vuex";
import nodeDetails from "../components/nodeDetails.vue";
export default {
  data() {
    return {
      nodesListindex: 0,
    };
  },
  computed: {
    ...mapGetters([
      "ros",
      "nodesList",
      "topicsList",
      "servicesList",
      "actionsServersList",
    ]),
    removeSlash() {
      return (v) => {
        return String(v).replace("/", "");
      };
    },
  },
  components: {
    jumbotronHeader,
    nodeDetails,
  },
  methods: {
    ...mapActions([
      "updateNodesListAction",
      "updateTopicsListAction",
      "updateServicesListAction",
      "updateActionServersListAction",
    ]),
    updatePage() {
      this.updateNodesListAction();
      this.updateTopicsListAction();
      this.updateServicesListAction();
      this.updateActionServersListAction();
    },
  },
  mounted() {
    this.updatePage();
  },
};
</script>
  
  
<style scoped>
.nts-page {
  min-height: 100vh;
  padding: 20px;
  padding-top: 0;
}
.list-group-item.active {
  background-color: #f2771a !important;
  color: white !important;
  border-color: #f2771a !important;
}
/* .rounded-pill {

} */
</style>