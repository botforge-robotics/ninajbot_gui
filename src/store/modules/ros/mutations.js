import ROSLIB from "roslib";
import store from "@/store";
export const changeRoboConnectionStatus = (state, payload) => {
  state.roboConnectionStatus = payload;
};
export const vel_pub = (state) => {
  state.vel_pub = state.ros.Topic({
    ros: state.ros,
    name: "/cmd_vel",
    messageType: "geometry_msgs/Twist",
  });
};
export const eyes_pub = (state) => {
  state.eyes_pub = state.ros.Topic({
    ros: state.ros,
    name: "/ninjabot/eyes",
    messageType: "ninjabot_msgs/Eyes",
  });
};
export const focus_light_pub = (state) => {
  state.focus_light_pub = state.ros.Topic({
    ros: state.ros,
    name: "/ninjabot/focus_lights",
    messageType: "ninjabot_msgs/Focus_lights",
  });
};
export const lcd_pub = (state) => {
  state.lcd_pub = state.ros.Topic({
    ros: state.ros,
    name: "/ninjabot/lcd",
    messageType: "ninjabot_msgs/Lcd",
  });
};

export const publishVel = (state, payload) => {
  var twist = new ROSLIB.Message({
    linear: {
      x: Number(payload.linear),
      y: 0,
      z: 0,
    },
    angular: {
      x: 0,
      y: 0,
      z: Number(payload.angular),
    },
  });
  state.vel_pub.publish(twist);
};
export const publishEyes = (state, payload) => {
  var msg = new ROSLIB.Message({ type: String(payload.data) });
  state.eyes_pub.publish(msg);
  store.commit("showToast", {
    time: Date.now().toString(),
    message: `Eyes message published! "${payload.data}".`,
  });
};
export const publishFocuslights = (state, payload) => {
  var msg = new ROSLIB.Message({
    right_light: Boolean(payload.right),
    left_light: Boolean(payload.left),
  });
  state.focus_light_pub.publish(msg);
  store.commit("showToast", {
    time: Date.now().toString(),
    message: `Focus lights message published! "Left:"${payload.left?"ON":"OFF"},"Right:"${payload.right?"ON":"OFF"}`,
  });
};
export const publishLcd = (state, payload) => {
  var msg = new ROSLIB.Message({
    message: String(payload.message == "" ? " " : payload.message),
    row: Number(payload.row),
  });
  state.lcd_pub.publish(msg);
  store.commit("showToast", {
    time: Date.now().toString(),
    message: `Lcd message published! "${payload.message}" to line ${payload.row}.`,
  });
};
export const updateFullAnim = (state, payload) => {
  state.fullAnim = payload.data;
};
export const updateEyes = (state, payload) => {
  state.eyes = payload.data;
};
export const updateFocusLight = (state, payload) => {
  state.focusLight.left = payload.left;
  state.focusLight.right = payload.right;
};
export const updateLcd = (state, payload) => {
  state.lcd.message = payload.message;
  state.lcd.row = payload.row;
};
export const set_max_allowed_linear_vel = (state, payload) => {
  state.max_allowed_linear_vel = payload;
};
export const set_max_allowed_angular_vel = (state, payload) => {
  state.max_allowed_angular_vel = payload;
};
export const set_max_linear_vel = (state, payload) => {
  state.max_linear_vel = payload;
};
export const set_max_angular_vel = (state, payload) => {
  state.max_angular_vel = payload;
};
