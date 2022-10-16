
<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <div>
        <img
          class="navbar-brand"
          src="./assets/images/logo.png"
          alt="UnReal Robotics"
          width="250"
        />
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/teleop" active-class="active" class="nav-link"
              >Teleop</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/aux" active-class="active" class="nav-link"
              >Auxilaries</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/mapping" active-class="active" class="nav-link"
              >Mapping</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/navigation" active-class="active" class="nav-link"
              >Navigation</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/nts" active-class="active" class="nav-link"
              >Nodes,Topics & Services</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/params" active-class="active" class="nav-link"
              >Params</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/3d" active-class="active" class="nav-link"
              >3dModel</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/log" active-class="active" class="nav-link"
              >Log</router-link
            >
          </li>
        </ul>
        <div class="d-flex">
          <input
            class="form-control me-2"
            placeholder="Robot IP"
            v-model="robotIp"
            :disabled="isRoboConnected"
          />
          <button
            v-if="!isRoboConnected"
            class="btn btn-outline-success"
            @click="connectRobot('ws://' + this.robotIp + ':9090')"
          >
            Connect
          </button>
          <button
            v-if="isRoboConnected"
            class="btn btn-outline-danger"
            @click="disconnectRobot"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  </nav>
  <div class="page-container">
    <router-view />
    <toast-comp></toast-comp>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import toastComp from "./components/toastComp.vue";
export default {
  data() {
    return {
      robotIp: "localhost",
    };
  },
  components: {
    toastComp,
  },
  computed: {
    ...mapGetters(["isRoboConnected", "ros"]),
  },
  methods: {
    ...mapActions(["connectRobot", "disconnectRobot"]),
    ...mapMutations(["showToast","vel_pub"]),
  },

  mounted() {
    window.document.title = "NinjaBot-GUI";
    //ros callbacks
    let vm = this;
    this.ros.on("connection", function () {
      console.log("Connected to websocket server.");
      //set topics
      vm.vel_pub();
      vm.$router.push({ name: "teleop" });
      vm.showToast({
        time: Date.now().toString(),
        message: "Connected to Ninjabot",
      });
    });

    this.ros.on("error", function (error) {
      console.log("Error connecting to websocket server: ", error);
    });

    this.ros.on("close", function () {
      console.log("Connection to websocket server closed.");
      vm.$router.push("/");
      vm.showToast({
        time: Date.now().toString(),
        message: "Disconnected from Ninjabot",
      });
    });
  },
};
</script>
<style>
.page-container {
  width: 100%;
  min-height: 100vh;
}
input.form-control:focus {
  border-color: #f2771a !important;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgb(242, 119, 26);
}
</style>
