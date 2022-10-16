import ROSLIB from "roslib";
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
