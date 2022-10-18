export const isRoboConnected = (state) => {
  return state.roboConnectionStatus && state.ros.isConnected;
};
export const ros = (state) => {
  return state.ros;
};
export const vel_pub = (state) => {
  return state.vel_pub;
};
export const eyes_pub = (state) => {
  return state.eyes_pub;
};
export const focus_light_pub = (state) => {
  return state.focus_light_pub;
};
export const lcd_pub = (state) => {
  return state.lcd_pub;
};
export const fullAnim = (state) => {
  return state.fullAnim;
};
export const eyes = (state) => {
  return state.eyes;
};
export const focusLight = (state) => {
  return state.focusLight;
};
export const lcd = (state) => {
  return state.lcd;
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
