<template>
  <div class="d-flex flex-column align-items-center">
   
      <img id="camera" />
    
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
    };
  },
  computed: {
    ...mapGetters(["ros"]),
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
      this.img_listner = this.ros.Topic({
        ros: this.ros,
        name: topic,
        messageType: "sensor_msgs/CompressedImage",
      });
      this.img_listner.subscribe(function (m) {
        document.getElementById("camera").src =
          "data:image/jpg;base64," + m.data;
      });
    },
    unSubscribeImage() {
      this.img_listner.unsubscribe();
    },
  },
  mounted() {
    let vm = this;
    this.subscribeImage(this.image_topic_name);
    this.ros.getTopicsForType(
      "sensor_msgs/CompressedImage",
      (data) => {
        vm.image_topics_list = [...data];
      },
      () => {}
    );
  },
  unmounted() {
    this.unSubscribeImage();
  },
};
</script>

<style scoped>
#camera {
  width: 640px;
  height: 480px;
  background-color: black;
}
</style>