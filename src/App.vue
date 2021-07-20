<template>
  <div class="container">
    <Slider :selectedThumbnailBorderColor="'yellow'" :thumbnailsToShow="5" :upperArrowSize="'3rem'" :lowerArrowSize="'2rem'" :height="500" :images="gotImages" />
  </div>
</template>

<script>
import Slider from "./components/Slider.vue";

export default {
  name: "App",
  data: function () {
    return {
      sliderSettings: {
        thumbnails: {
          thumbnailsToShow: 4,
        },
      },
      gotImages: [
        require("@/assets/img/img-1.jpg"),
        require("@/assets/img/img-2.jpg"),
        require("@/assets/img/img-3.jpg"),
        require("@/assets/img/img-4.jpg"),
        require("@/assets/img/img-5.jpg"),
        require("@/assets/img/img-6.jpg"),
        require("@/assets/img/img-1.jpg"),
        require("@/assets/img/img-2.jpg"),
        require("@/assets/img/img-3.jpg"),
        require("@/assets/img/img-4.jpg"),
        require("@/assets/img/img-5.jpg"),
        require("@/assets/img/img-6.jpg"),
      ],
    };
  },
  components: {
    Slider,
  },
};
</script>


