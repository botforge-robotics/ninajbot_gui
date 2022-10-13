
<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <div >
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
            <router-link to="/home" active-class="active"  class="nav-link"
              >Home</router-link
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
            <router-link to="/config" active-class="active" class="nav-link"
              >Config</router-link
            >
          </li>
        </ul>
        <div class="d-flex">
          <input
            class="form-control me-2"
            placeholder="Robot IP"
            v-model="robotIp"
            :disabled = "isRoboConnected"
          />
          <button v-if="!isRoboConnected" class="btn btn-outline-success" @click='connectRobot("ws://"+ this.robotIp +":9090")'>Connect</button>
          <button v-if="isRoboConnected" class="btn btn-outline-danger" @click="disconnectRobot">Disconnect</button>
        </div>
      </div>
    </div>
  </nav>
  <div class="page-container">

    <router-view />
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';


  export default{
    data(){
      return {
        robotIp:"localhost",
      }
    },
    computed:{
      ...mapGetters(["isRoboConnected","ros"]),
    },
    methods:{
      ...mapActions(["connectRobot","disconnectRobot"]),
    },
    created(){
      //ros callbacks
      let vm = this;
      this.ros.on("connection", function () {
        console.log("Connected to websocket server.");
        vm.$router.push({name:"home"});
        
      });

      this.ros.on("error", function (error) {
        console.log("Error connecting to websocket server: ", error);
      });

      this.ros.on("close", function () {
        console.log("Connection to websocket server closed.");
        vm.$router.push("/");
      });
    }
  }
</script>
<style>
.page-container{
  width: 100%;
  min-height: 100vh;
}
.form-control:focus {
  border-color: #F2771A;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgb(242,119,26);
}
</style>
