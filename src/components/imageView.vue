<template>
  <div class="d-flex flex-column align-items-center">
    <img id="camera" :src="stream_link" />

    <select
      class="form-select mt-2"
      style="max-width: 400px"
      aria-label="image_topic"
      v-model="image_topic_name"
      @change="subscribeImage($event.target.value)"
    >
      <option
        :value="topic"
        v-for="(topic, index) in image_topics_list"
        :key="index"
      >
        {{ topic }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      img_listner: null,
      image_topics_list: ["/"],
      stream_link: "http://",
    };
  },
  computed: {
    ...mapGetters(["ros", "robotIP"]),
    image_topic_name: {
      get() {
        return this.$store.getters.image_topic_name;
      },
      set(value) {
        this.$store.commit("updateImageTopicName", value);
      },
    },
  },
  methods: {
    subscribeImage(topic) {
      //   this.img_listner = this.ros.Topic({
      //     ros: this.ros,
      //     name: topic,
      //     messageType: "sensor_msgs/CompressedImage",
      //   });
      //   this.img_listner.subscribe(function (m) {
      //     document.getElementById("camera").src =
      //       "data:image/jpg;base64," + m.data;
      //   });
      var to = topic.lastIndexOf("/");
      to = to == -1 ? topic.length : to + 1;
      topic = topic.substring(0, to - 1);
      this.stream_link =
        "http://" + this.robotIP + ":9000/stream?topic=" + topic;
    },
    // unSubscribeImage() {
    //   this.img_listner.unsubscribe();
    // },
  },
  mounted() {
    let vm = this;
    // this.subscribeImage(this.image_topic_name);
    this.ros.getTopicsForType(
      "sensor_msgs/CompressedImage",
      (data) => {
        vm.image_topics_list = [...data];
      },
      () => {}
    );
    var to = this.image_topic_name.lastIndexOf("/");
    to = to == -1 ? this.image_topic_name.length : to + 1;
    this.stream_link =
      "http://" +
      this.robotIP +
      ":9000/stream?topic=" +
      this.image_topic_name.substring(0, to - 1);
  },
  // unmounted() {
  //   this.unSubscribeImage();
  // },
};
</script>

<style scoped>
#camera {
  width: 640px;
  height: 480px;
  background-color: black;
}
@media screen and (max-width: 1024px) {
  #camera {
    width: 45vw;
    height: 34.6vw;
  }
}
</style>