import SimpleGallerySlider from "./components/SimpleGallerySlider.vue";

const GallerySlider = {
 install(Vue) {
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
  Vue.component("vue-simple-gallery-slider", SimpleGallerySlider);
 }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(GallerySlider);
}

export default GallerySlider;