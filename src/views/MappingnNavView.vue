<template>
  <div class="mapping-page h-100">
    <jumbotron-Header
      :title="running_nav_node ? 'Navigation' : 'Mapping'"
    ></jumbotron-Header>
    <div class="d-flex mt-4 flex-row w-100 text-center align-items-center">
      <p class="col-4 fs-3 fw-semibold fst-italic" style="width: 520px">
        Camera Feed
      </p>
      <p class="col-4 fs-3 fw-semibold fst-italic">Control</p>
      <p class="col-4 fs-3 fw-semibold fst-italic" style="width: 640px">Map</p>
    </div>
    <div class="teleopConatiner">
      <div class="d-flex flex-row justify-content-evenly align-items-center">
        <image-view
          class="col-4 p-0"
          style="max-width: 480px !important"
        ></image-view>
        <joy-stick class="col-4 ps-3"></joy-stick>
        <map-view class="col-4 p-0"></map-view>
      </div>
    </div>

    <!-- buttons nav,map, save -->
    <div
      class="d-flex flex-row justify-content-end w-100 mt-4"
      style="height: 40px"
    >
      <button
        type="button"
        class="btn me-5"
        :class="{
          'btn-success': !running_map_node,
          'btn-danger': running_map_node,
        }"
        @click="mapStartStop"
        :disabled="map_btn_busy"
        v-if="!running_nav_node"
      >
        <span
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
          v-if="map_btn_busy"
        ></span>
        {{
          map_btn_busy
            ? running_map_node
              ? "Stopping"
              : "Starting"
            : running_map_node
            ? "Stop Mapping"
            : "Start Mapping"
        }}
      </button>

      <button
        type="button"
        class="btn btn-primary me-5"
        data-bs-toggle="modal"
        data-bs-target="#navStartModal"
        :class="{
          'btn-success': !running_nav_node,
          'btn-danger': running_nav_node,
        }"
        v-if="!running_map_node"
      >
        {{ running_nav_node ? "Stop Navigation" : "Start Navigation" }}
      </button>

      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#savemap"
        class="btn text-white me-5 orange-Btn"
        :disabled="!running_map_node"
        v-if="!running_nav_node"
      >
        Save Map
      </button>
    </div>
    <!-- Map Modal -->
    <div
      class="modal fade"
      id="savemap"
      tabindex="-1"
      aria-labelledby="savemapLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="savemapLabel">Save map?</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row align-items-center">
              <div class="col-auto">
                <label for="mapName" class="col-form-label me-2"
                  >Map Name:</label
                >
              </div>
              <div class="col-auto">
                <input
                  id="map_name"
                  class="form-control"
                  v-model="map_name"
                  @input="v$.map_name.$touch()"
                />
              </div>
              <div class="col-auto">
                <span id="mapNameHelpInline" class="form-text">
                  Must be only alphabets, Min Length 4, Max Length 10.
                </span>
              </div>
            </div>

            <p v-if="v$.map_name.$error" class="text-danger fs-6">
              Invalid name!
            </p>
          </div>
          <div class="modal-footer">
            <button
              id="map_modal_close_btn"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn orange-Btn"
              :disabled="map_save_btn_busy || v$.map_name.$error"
              @click="saveMap"
            >
              <span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
                v-if="map_save_btn_busy"
              ></span>
              {{ map_save_btn_busy ? "Saving" : "save" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Nav Modal -->
    <div
      class="modal fade"
      id="navStartModal"
      tabindex="-1"
      aria-labelledby="navStartModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="navStartModalLabel">
              {{ running_nav_node ? "Stop navigation?" : "Launch navigation?" }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" v-if="!running_nav_node">
            <div class="d-flex flex-row align-items-center">
              <div class="col-auto mb-2">
                <label for="navMapName" class="col-form-label me-3"
                  >Map Name:
                </label>
              </div>
              <div class="col-auto">
                <input
                  id="navMapName"
                  class="form-control"
                  v-model="navMapName"
                  @input="v$.navMapName.$touch()"
                />
              </div>
            </div>
            <p v-if="v$.navMapName.$error" class="text-danger fs-6">
              Invalid name!
            </p>
            <div class="d-flex flex-row align-items-center">
              <div class="col-auto">
                <label class="col-form-label me-2">Local Planner: </label>
              </div>
              <select
                class="form-select w-75"
                aria-label="localPlannerType"
                v-model="localPlannerName"
              >
                <option selected value="teb">Timed Elastic Band</option>
                <option value="dwa">Dynamic Window Approach</option>
              </select>
            </div>
            <div>
              <div class="form-check">
                <label class="form-check-label" for="navSimRadio">
                  Simulation
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  value="simulation"
                  id="navSimRadio"
                  v-model="navRobotType"
                />
              </div>
              <div class="form-check">
                <label class="form-check-label" for="navRealRadio">
                  Physical Robot
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  value="real"
                  id="navRealRadio"
                  v-model="navRobotType"
                />
              </div>
            </div>
          </div>
          <div class="modal-body" v-if="running_nav_node">...</div>
          <div class="modal-footer">
            <button
              id="nav_modal_close_btn"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn me-5 btn-success"
              @click="navStartStop"
              :disabled="v$.navMapName.$error"
              :class="{
                'btn-success': !running_nav_node,
                'btn-danger': running_nav_node,
              }"
            >
              <span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
                v-if="nav_btn_busy"
              ></span>
              {{
                nav_btn_busy
                  ? running_nav_node
                    ? "Stopping"
                    : "Starting"
                  : running_nav_node
                  ? "Stop Navigation"
                  : "Start Navigation"
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import imageView from "../components/imageView.vue";
import joyStick from "../components/joystickComp.vue";
import jumbotronHeader from "../components/jumbotronHeading.vue";
import { mapGetters, mapMutations } from "vuex";
import mapView from "../components/mapComp.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, alpha, minLength, maxLength } from "@vuelidate/validators";
export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      map_btn_busy: false,
      startServiceClient: null,
      stopServiceClient: null,
      map_save_btn_busy: null,
      map_name: "test",
      laser_listener: null,
      tf_client: null,
      poseListner: null,
      gridClient: null,
      nav_btn_busy: false,
      navMapName: "test",
      navGoal: null,
      localPlannerName: "dwa",
      navRobotType: "simulation",
    };
  },
  computed: {
    ...mapGetters([
      "ros",
      "running_map_node",
      "running_nav_node",
      "api_start_service_name",
      "api_stop_service_name",
      "api_srv_type",
    ]),
  },
  validations() {
    return {
      map_name: {
        required,
        alpha,
        minLengthValue: minLength(4),
        maxLengthValue: maxLength(10),
      },
      navMapName: {
        required,
        alpha,
        minLengthValue: minLength(4),
        maxLengthValue: maxLength(10),
      },
    };
  },
  components: {
    imageView,
    joyStick,
    jumbotronHeader,
    mapView,
  },
  methods: {
    ...mapMutations([
      "updateMappingNodeStatus",
      "showToast",
      "updateNavNodeStatus",
    ]),
    saveMap() {
      this.map_save_btn_busy = true;
      var request = new ROSLIB.ServiceRequest({
        file: "map_saver",
        args: "map_name:=" + this.map_name.toLocaleLowerCase(),
      });
      let vm = this;
      this.startServiceClient.callService(request, function (result) {
        vm.map_save_btn_busy = false;
        let msg = "";
        if (result.success) {
          msg = `Saved ${vm.map_name} map!`;
          const modal_cl_btn = document.getElementById("map_modal_close_btn");
          modal_cl_btn.click();
        } else {
          msg = `Failed to save ${vm.map_name} map!`;
        }
        vm.showToast({
          time: Date.now().toString(),
          message: msg,
        });
      });
    },
    mapStartStop() {
      this.map_btn_busy = true;
      if (!this.running_map_node) {
        var request = new ROSLIB.ServiceRequest({
          file: "map",
          args: "scan_topic:=ninjabot/scan",
        });
        let vm = this;
        this.startServiceClient.callService(request, function (result) {
          vm.map_btn_busy = false;
          let msg = "";
          if (result.success) {
            msg = "Started mapping!";
            vm.updateMappingNodeStatus(true);
          } else {
            msg = "failed Start mapping!!";
          }
          vm.showToast({
            time: Date.now().toString(),
            message: msg,
          });
        });
      } else {
        var request = new ROSLIB.ServiceRequest({
          file: "map",
          args: "scan_topic:=ninjabot/scan",
        });
        let vm = this;
        this.stopServiceClient.callService(request, function (result) {
          vm.map_btn_busy = false;
          let msg = "";
          if (result.success) {
            msg = "Stopped mapping!";
            vm.updateMappingNodeStatus(false);
          } else {
            msg = "failed Stop mapping!!";
          }
          vm.showToast({
            time: Date.now().toString(),
            message: msg,
          });
        });
      }
    },
    startNavigation(file, args) {
      var request = new ROSLIB.ServiceRequest({
        file: file,
        args: args,
      });
      let vm = this;
      this.startServiceClient.callService(request, function (result) {
        vm.nav_btn_busy = false;
        let msg = "";
        if (result.success) {
          msg = "Started navigation!";
          vm.updateNavNodeStatus(true);
          const modal_cl_btn = document.getElementById("nav_modal_close_btn");
          modal_cl_btn.click();
        } else {
          msg = "failed start navigation!!";
        }
        vm.showToast({
          time: Date.now().toString(),
          message: msg,
        });
      });
    },
    stopNavigation(file, args) {
      var request = new ROSLIB.ServiceRequest({
        file: file,
        args: args,
      });
      let vm = this;
      this.stopServiceClient.callService(request, function (result) {
        vm.nav_btn_busy = false;
        let msg = "";
        if (result.success) {
          msg = "Stoppped navigation!";
          vm.updateNavNodeStatus(false);
          const modal_cl_btn = document.getElementById("nav_modal_close_btn");
          modal_cl_btn.click();
        } else {
          msg = "failed stop navigation!!";
        }
        vm.showToast({
          time: Date.now().toString(),
          message: msg,
        });
      });
    },
    navStartStop() {
      this.nav_btn_busy = true;
      if (this.running_nav_node)
        this.stopNavigation(
          this.navRobotType == "simulation" ? "nav" : "real_nav",
          `gui:=false map:=${this.navMapName} localPlanner:=${this.localPlannerName}`
        );
      else
        this.startNavigation(
          this.navRobotType == "simulation" ? "nav" : "real_nav",
          `gui:=false map:=${this.navMapName} localPlanner:=${this.localPlannerName}`
        );
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.running_map_node || this.running_nav_node) {
      alert(this.running_map_node ? "Stop Mapping" : "Stop Navigation");
      next(false);
    } else {
      next();
    }
  },
  mounted() {
    let vm = this;

    // resixze image view
    document.getElementById("camera").style.width = "480px";
    document.getElementById("camera").style.height = "360px";

    // register service clients
    this.startServiceClient = new ROSLIB.Service({
      ros: this.ros,
      name: this.api_start_service_name,
      serviceType: this.api_srv_type,
    });
    this.stopServiceClient = new ROSLIB.Service({
      ros: this.ros,
      name: this.api_stop_service_name,
      serviceType: this.api_srv_type,
    });

    // Create the main viewer.
    var viewer = new ROS2D.Viewer({
      divID: "map",
      width: 640,
      height: 480,
    });
    // Add zoom to the viewer.
    var zoomView = new ROS2D.ZoomView({
      rootObject: viewer.scene,
    });
    // Add panning to the viewer.
    var panView = new ROS2D.PanView({
      rootObject: viewer.scene,
    });

    // Add navigation goal
    this.navGoal = new ROS2D.NavGoal({
      ros: this.ros,
      rootObject: viewer.scene,
      actionTopic: "/move_base",
      actionMsgType: "move_base_msgs/MoveBaseAction",
      mapFrame:"map"
    });
    // Setup the map client.
    this.gridClient = new ROS2D.OccupancyGridClient({
      ros: this.ros,
      rootObject: viewer.scene,
      continuous: true,
    });

    // Scale the canvas to fit to the map
    this.gridClient.on("change", function () {
      viewer.scaleToDimensions(
        vm.gridClient.currentGrid.width,
        vm.gridClient.currentGrid.height
      );
      viewer.shift(
        vm.gridClient.currentGrid.pose.position.x,
        vm.gridClient.currentGrid.pose.position.y
      );
      vm.navGoal.initScale();
      registerMouseHandlers();
    });

    function registerMouseHandlers() {
      // Setup mouse event handlers
      var mouseDown = false;
      var zoomKey = false;
      var panKey = false;
      var startPos = new ROSLIB.Vector3();
      viewer.scene.addEventListener("stagemousedown", function (event) {
        if (event.nativeEvent.ctrlKey === true) {
          zoomKey = true;
          zoomView.startZoom(event.stageX, event.stageY);
        } else if (event.nativeEvent.shiftKey === true) {
          panKey = true;
          panView.startPan(event.stageX, event.stageY);
        } else {
          var pos = viewer.scene.globalToRos(event.stageX, event.stageY);
          vm.navGoal.startGoalSelection(pos);
        }
        startPos.x = event.stageX;
        startPos.y = event.stageY;
        mouseDown = true;
      });

      viewer.scene.addEventListener("stagemousemove", function (event) {
        if (mouseDown === true) {
          if (zoomKey === true) {
            var dy = event.stageY - startPos.y;
            var zoom =
              1 + (10 * Math.abs(dy)) / viewer.scene.canvas.clientHeight;
            if (dy < 0) zoom = 1 / zoom;
            zoomView.zoom(zoom);
          } else if (panKey === true) {
            panView.pan(event.stageX, event.stageY);
          } else {
            var pos = viewer.scene.globalToRos(event.stageX, event.stageY);
            vm.navGoal.orientGoalSelection(pos);
          }
        }
      });

      viewer.scene.addEventListener("stagemouseup", function (event) {
        if (mouseDown === true) {
          if (zoomKey === true) {
            zoomKey = false;
          } else if (panKey === true) {
            panKey = false;
          } else {
            var pos = viewer.scene.globalToRos(event.stageX, event.stageY);
            var goalPose = vm.navGoal.endGoalSelection(pos);
            if (vm.running_nav_node) vm.navGoal.sendGoal(goalPose);
          }
          mouseDown = false;
        }
      });
    }
    function getYawFromQuat(q) {
      var quat = new THREE.Quaternion(q.x, q.y, q.z, q.w);
      var yaw = new THREE.Euler().setFromQuaternion(quat);
      return yaw["_z"] * (180 / Math.PI);
    }

    // Laser scanner
    function displayLaserScan() {
      var base_footprint_tf = null;
      vm.tf_client = new ROSLIB.TFClient({
        ros: vm.ros,
        fixedFrame: "map",
        angularThres: 0.01,
        transThres: 0.01,
      });
      vm.tf_client.subscribe("/base_link", function (tf) {
        base_footprint_tf = tf;
      });

      let marker_radius = 0.06;
      let marker_fill_color = createjs.Graphics.getRGB(255, 0, 0, 1.0);
      let prev_markers = null;

      vm.laser_listener = new ROSLIB.Topic({
        ros: vm.ros,
        name: "ninjabot/scan",
        messageType: "sensor_msgs/LaserScan",
      });
      vm.laser_listener.subscribe(function (msg) {
        const num = msg.ranges.length;
        const angles = Array.from(
          { length: num },
          (_, i) => msg.angle_min + ((msg.angle_max - msg.angle_min) / num) * i
        );

        const poses_2d = angles.flatMap((angle, index) => {
          const range = msg.ranges[index];
          if (range > msg.range_min && range < msg.range_max) {
            return [[Math.cos(angle) * range, Math.sin(angle) * range, -angle]];
          }
          return []; // Skip this point
        });
        if (base_footprint_tf === null) {
          return;
        }
        // TODO: We might be able to apply the tf transform to the container itself, and dont have to do it on each pose.
        // Init the graphics component
        const scan_markers = new createjs.Container();
        const graphics = new createjs.Graphics()
          .beginFill(marker_fill_color)
          .drawCircle(0, 0, marker_radius)
          .endFill();

        // Transform each point and add it to the graphics
        poses_2d.forEach((pt) => {
          // pt[2] += Math.PI / 2
          const pose = new ROSLIB.Pose({
            position: new ROSLIB.Vector3({
              x: pt[0],
              y: pt[1],
              z: 0,
            }),
            orientation: new ROSLIB.Quaternion({
              x: 0,
              y: 0,
              z: Math.cos(pt[2]),
              w: Math.sin(pt[2]),
            }),
          });
          pose.applyTransform(base_footprint_tf);
          const marker = new createjs.Shape(graphics);
          marker.x = pose.position.x;
          marker.y = -pose.position.y;
          marker.rotation = -getYawFromQuat(pose.orientation).toFixed(2);
          scan_markers.addChild(marker);
        });

        // TODO: Just update the old one, dont make new ones everytime
        if (this.prev_markers !== null) {
          viewer.scene.removeChild(prev_markers);
        }

        viewer.addObject(scan_markers);
        prev_markers = scan_markers;
      });
    }

    //  Robot pose marker
    var robotMarker = new ROS2D.NavigationImage({
      size: 0.8,
      pulse: false,
      image: require("../assets/navTriangle.png"),
    });
    vm.gridClient.rootObject.addChild(robotMarker);
    this.poseListner = new ROSLIB.Topic({
      ros: vm.ros,
      name: "robot_pose",
      messageType: "geometry_msgs/Pose",
    });
    this.poseListner.subscribe(function (msg) {
      robotMarker.x = msg.position.x;
      robotMarker.y = -msg.position.y;
      robotMarker.rotation = -getYawFromQuat(msg.orientation).toFixed(
        2
      );
    });

    displayLaserScan();
  },
  unmounted() {
    this.laser_listener.unsubscribe();
    this.tf_client.unsubscribe("/base_link");
    this.poseListner.unsubscribe();
    delete this.gridClient;
  },
};
</script>


<style scoped>
.mapping-page {
  min-height: 100vh;
  padding: 20px;
  padding-top: 0;
}
.tab-content {
  min-height: 330px;
}
.tab-pane {
  min-height: 330px;
}
#zone_joystick {
  min-height: 330px;
}
img #camera {
  max-width: 480px !important;
  max-height: 360px !important;
  background-color: black;
}
.orange-Btn {
  width: 100px;
  background-color: #f2771a !important;
  color: white !important;
}
.orange-Btn:hover {
  background-color: #bd5404 !important;
  color: rgb(216, 216, 216) !important;
}
</style>