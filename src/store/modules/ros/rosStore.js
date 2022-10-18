import ROSLIB from "roslib";
import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

const state = {
  roboConnectionStatus: false,
  ros: new ROSLIB.Ros(),
  vel_pub: null,
  eyes_pub: null,
  focus_light_pub:null,
  lcd_pub:null,
  fullAnim: false,
  eyes: "neutral",
  focusLight: {
    left: false,
    right: false,
  },
  lcd: {
    message: "",
    row: 0,
  },
  max_allowed_linear_vel: 3.0,
  max_allowed_angular_vel: 3.0,
  min_allowed_linear_vel: 0.1,
  min_allowed_angular_vel: 0.05,
  max_linear_vel: 0.5,
  max_angular_vel: 0.2,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
