import ROSLIB from "roslib";

const state = {
  roboConnectionStatus: false,
  ros: new ROSLIB.Ros(),
};
const getters = {
  isRoboConnected: (state) => {
    return state.roboConnectionStatus && state.ros.isConnected;
  },
  ros: (state)=>{
    return state.ros;
  }
};
const mutations = {
  changeRoboConnectionStatus: (state, payload) => {
    state.roboConnectionStatus = payload;
  },
};
const actions = {
  connectRobot: ({ commit,state }, payload) => {
    state.ros.close();
    state.ros.connect(payload);
    commit('changeRoboConnectionStatus',true);
  },
  disconnectRobot: ({ commit,state }) => {
    state.ros.close();
    commit('changeRoboConnectionStatus',false);
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
};
