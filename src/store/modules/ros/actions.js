import store from "@/store";
export const connectRobot = ({ commit, state }, payload) => {
  state.ros.close();
  state.ros.connect(payload);
  commit("changeRoboConnectionStatus", true);
};
export const disconnectRobot = ({ commit, state }) => {
  state.ros.close();
  commit("changeRoboConnectionStatus", false);
};
export const updateNodesListAction = ({ commit, state }) => {
  let nodes = {};
  nodes["nodes"] = [];
  nodes["nodesCount"] = 0;
  state.ros.getNodes(
    (data) => {
      data.forEach((node) => {
        state.ros.getNodeDetails(
          node,
          (sub, pub, srv) => {
            nodes["nodes"].push({
              node: node,
              pubs: [...pub],
              subs: [...sub],
              srvs: [...srv],
            });
            nodes["nodesCount"] += 1;
            commit("updateNodesList", nodes);
          },
          () => {
            store.commit("showToast", {
              time: Date.now().toString(),
              message: `Error gettting nodes details!`,
            });
          }
        );
      });
    },
    () => {
      store.commit("showToast", {
        time: Date.now().toString(),
        message: `Error gettting nodes list!`,
      });
      commit("updateNodesList", nodes);
    }
  );
};

export const updateTopicsListAction = ({ commit, state }) => {
  let topics = {};
  topics["topics"] = [];
  topics["topicsCount"] = 0;
  state.ros.getTopics(
    (data) => {
      data.topics.forEach((top) => {
        topics["topics"].push({
          topic: top,
          msgTyp: data.types[data.topics.indexOf(top)],
        });
      });
      topics["topicsCount"] = data.topics.length;
      topics["topics"].forEach((top) => {
        state.ros.getMessageDetails(
          top.msgTyp,
          (data) => {
            top["msgdetails"] = { ...data };
            commit("updateTopicsList", topics);
          },
          () => {}
        );
      });
    },
    () => {
      store.commit("showToast", {
        time: Date.now().toString(),
        message: `Error gettting topics list!`,
      });
      commit("updateTopicsList", topics);
    }
  );
};
export const updateServicesListAction = ({ commit, state }) => {
  let services = {};
  services["services"] = [];
  services["servicesCount"] = 0;
  state.ros.getServices(
    (data) => {
      services["servicesCount"] = data.length;
      data.forEach((ser) => {
        services["services"].push({
          service: ser,
        });
      });
      services["services"].forEach((ser) => {
        state.ros.getServiceType(
          ser.service,
          (data) => {
            ser["srvType"] = data;
            commit("updateServicesList", services);
          },
          () => {}
        );
      });
    },
    () => {
      store.commit("showToast", {
        time: Date.now().toString(),
        message: `Error gettting services list!`,
      });
      commit("updateServicesList", services);
    }
  );
};
export const updateActionServersListAction = ({ commit, state }) => {
  let actions = {};
  actions["servers"] = [];
  actions["serversCount"] = 0;
  state.ros.getActionServers(
    (data) => {
      actions["serversCount"] = data.length;
      data.forEach((ser) => {
        actions["servers"].push({
          server: ser,
        });
      });
      commit("updateActionServersList", actions);
    },
    () => {
      store.commit("showToast", {
        time: Date.now().toString(),
        message: `Error gettting action servers list!`,
      });
      commit("updateActionServersList", actions);
    }
  );
};
export const updateParamsListAction = ({ commit, state }) => {
  let params = {};
  params["params"] = [];
  params["paramsCount"] = 0;
  state.ros.getParams(
    (data) => {
      params["paramsCount"] = data.length;
      data.forEach((param) => {
        params["params"].push({
          param: param,
        });
      });
      params["params"].forEach((param) => {
        let temp_param = state.ros.Param({
          ros: state.ros,
          name: param.param,
        });
        temp_param.get((val) => {
          param["value"] = val;
          commit("updateParamsList", params);
        });
      });
    },
    () => {
      store.commit("showToast", {
        time: Date.now().toString(),
        message: `Error gettting params list!`,
      });
      commit("updateParamsList", params);
    }
  );
};
export const addToLogsAction = ({ commit }, payload) => {
  commit("addToLogs", payload);
};
