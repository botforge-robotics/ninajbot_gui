export const isRoboConnected = (state) => {
  return state.roboConnectionStatus && state.ros.isConnected;
};
export const ros = (state) => {
  return state.ros;
};
export const vel_pub = (state) => {
  return state.vel_pub;
};
export const max_allowed_linear_vel = (state) => {
  return state.max_allowed_linear_vel;
};
export const max_allowed_angular_vel = (state) => {
  return state.max_allowed_angular_vel;
};
export const min_allowed_linear_vel = (state) => {
    return state.min_allowed_linear_vel;
  };
  export const min_allowed_angular_vel = (state) => {
    return state.min_allowed_angular_vel;
  };
export const max_linear_vel = (state) => {
  return state.max_linear_vel;
};
export const max_angular_vel = (state) => {
  return state.max_angular_vel;
};
