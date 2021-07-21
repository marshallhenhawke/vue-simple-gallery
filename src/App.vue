<template>
  <div class="container">
    <SimpleGallerySlider :selectedThumbnailBorderColor="'yellow'" :thumbnailsToShow="5"  :height="500" :images="gotImages" />
  </div>
</template>

<script>
import SimpleGallerySlider from "./components/SimpleGallerySlider.vue";
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
        require("@/assets/img/img-2.jpg"),
        require("@/assets/img/img-2.jpg"),
        require("@/assets/img/img-2.jpg"),
        require("@/assets/img/img-2.jpg")
      ],
    };
  },
  components: {
    SimpleGallerySlider,
  },
};
</script>