<template>
  <div class="mapping-page h-100">
    <jumbotron-Header title="Mapping"></jumbotron-Header>
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
        @click="updateMappingNodeStatus(!running_map_node)"
      >
        {{ running_map_node ? "Stop Mapping" : "Start Mapping" }}
      </button>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#savemap"
        class="btn text-white me-5 orange-Btn"
      >
        Save Map
      </button>
    </div>
    <!-- Modal -->
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
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="mapName" class="col-form-label"
                  >Map Name</label
                >
              </div>
              <div class="col-auto">
                <input
                  id="mapName"
                  class="form-control"
                />
              </div>
              <div class="col-auto">
                <span id="mapNameHelpInline" class="form-text">
                  Must be only alphabets.
                </span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn orange-Btn">Save</button>
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
// import {Viewer,OccupancyGridClient} from "../helper/ros2d";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["ros", "running_map_node"]),
  },
  components: {
    imageView,
    joyStick,
    jumbotronHeader,
    mapView,
  },
  methods: {
    ...mapMutations(["updateMappingNodeStatus"]),
  },
  mounted() {
    document.getElementById("camera").style.width = "480px";
    document.getElementById("camera").style.height = "360px";
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

    // Setup the map client.
    var gridClient = new ROS2D.OccupancyGridClient({
      ros: this.ros,
      rootObject: viewer.scene,
      continuous: true,
    });
    var robotMarker = new ROS2D.NavigationImage({
      size: 0.8,
      pulse: true,
      image: require("../assets/navTriangle.png"),
    });
    robotMarker.x = 0;
    robotMarker.y = 0;
    robotMarker.z = 45;

    // Scale the canvas to fit to the map
    gridClient.on("change", function () {
      viewer.scaleToDimensions(
        gridClient.currentGrid.width,
        gridClient.currentGrid.height
      );
      viewer.shift(
        gridClient.currentGrid.pose.position.x,
        gridClient.currentGrid.pose.position.y
      );
      registerMouseHandlers();
      displayLaserScan();
    });

    gridClient.rootObject.addChild(robotMarker);

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
          // var pos = viewer.scene.globalToRos(event.stageX, event.stageY);
          // navGoal.startGoalSelection(pos);
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
            // var pos = viewer.scene.globalToRos(event.stageX, event.stageY);
            // navGoal.orientGoalSelection(pos);
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
            // var pos = viewer.scene.globalToRos(event.stageX, event.stageY);
            // var goalPose = navGoal.endGoalSelection(pos);
            // navGoal.sendGoal(goalPose);
          }
          mouseDown = false;
        }
      });
    }

    let vm = this;
    function getYawFromQuat(q) {
      var quat = new THREE.Quaternion(q.x, q.y, q.z, q.w);
      var yaw = new THREE.Euler().setFromQuaternion(quat);
      return yaw["_z"] * (180 / Math.PI);
    }
    function displayLaserScan() {
      var base_footprint_tf = null;
      var tf_client = vm.ros.TFClient({
        ros: vm.ros,
        fixedFrame: "map",
        angularThres: 0.01,
        transThres: 0.01,
      });
      tf_client.subscribe("/base_link", function (tf) {
        base_footprint_tf = tf;
      });

      let marker_radius = 0.06;
      let marker_fill_color = createjs.Graphics.getRGB(255, 0, 0, 1.0);
      let prev_markers = null;

      let laser_listener = vm.ros.Topic({
        ros: vm.ros,
        name: "ninjabot/scan",
        messageType: "sensor_msgs/LaserScan",
      });
      laser_listener.subscribe(function (msg) {
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