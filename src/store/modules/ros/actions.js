export const connectRobot = ({ commit, state }, payload) => {
  state.ros.close();
  state.ros.connect(payload);
  commit("changeRoboConnectionStatus", true);
};
export const disconnectRobot = ({ commit, state }) => {
  state.ros.close();
  commit("changeRoboConnectionStatus", false);
};
