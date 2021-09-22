<template>
  <div>
    <div ref="mainContainer" :style="'height:' + height + 'px'" class="main-container">
      <div class="arrows-container">
        <div v-if="showUpperArrowBackground" class="blinder left-blinder"></div>
        <div v-if="showUpperArrowBackground" class="blinder right-blinder"></div>
        <div @click="upperSlideLeft" class="arrow left-arrow">
          <img :style="'width:' + upperArrowSize" class="img-fluid arrow-icon arrow-icon-left" :src="require('../assets/img/arrow_left.png')" />
        </div>
        <div @click="upperSlideRight" class="arrow right-arrow">
          <img :style="'width:' + upperArrowSize" class="img-fluid arrow-icon arrow-icon-right" :src="require('../assets/img/arrow_right.png')" />
        </div>
      </div>
      <div ref="slidingContainer" class="sliding-container">
        <div :style="'background-image:url(' + topImage + ')'" class="main-image" v-for="(topImage, index) in images" :key="index"></div>
      </div>
    </div>
    <div ref="thumbContainer" :style="'height:' + thumbHeight + 'px'" class="thumb-container">
      <div class="arrows-container">
        <div v-if="showLowerArrowBackground" class="blinder left-blinder"></div>
        <div v-if="showLowerArrowBackground" class="blinder right-blinder"></div>
        <div @click="lowerSlideLeft" class="arrow left-arrow">
          <img :style="'width:' + lowerArrowSize" class="img-fluid arrow-icon arrow-icon-left" :src="require('../assets/img/arrow_left.png')" />
        </div>
        <div @click="lowerSlideRight" class="arrow right-arrow">
          <img :style="'width:' + lowerArrowSize" class="img-fluid arrow-icon arrow-icon-right" :src="require('../assets/img/arrow_right.png')" />
        </div>
      </div>
      <div ref="slidingThumbContainer" class="sliding-thumb-container">
        <div
          ref="thumbSingle"
          :style="'background-image:url(' + topImage + '); width:' + computedWidth + '%'"
          class="thumb-image"
          v-for="(topImage, index) in images"
          :key="index"
          @click="handleThumbSelection(index)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimpleGallerySlider",
  props: {
    images: Array,
    height: Number,
    upperArrowSize: {
      type: String,
      default: "1.5rem",
    },
    lowerArrowSize: {
      type: String,
      default: "1rem",
    },
    thumbnailsToShow: {
      type: Number,
      default: 4,
    },
    selectedThumbnailBorderColor: {
      type: String,
      default: "red",
    },
    showUpperArrowBackground: {
      type: Boolean,
      default: false,
    },
    showLowerArrowBackground: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.$nextTick(function () {
      this.thumbHeight = this.$refs.thumbSingle[0].offsetWidth / 1.6;
      this.$refs.thumbSingle[0].classList.add("active");
      this.$refs.thumbSingle[0].style.borderColor = this.selectedThumbnailBorderColor;
    });
  },
  data: function () {
    return {
      counter: 0,
      counterThumb: 0,
      thumbHeight: 0,
    };
  },
  computed: {
    computedWidth() {
      return 100 / this.thumbnailsToShow;
    },
  },

  methods: {
    handleThumbSelection(index) {
      this.counter = index;
      this.displayUpper();
    },
    displayUpper() {
      if (this.counter < 0) this.counter = 0;
      if (this.counter > this.images.length - 1) this.counter = this.images.length - 1;
      this.removeBorders();
      var val = -(this.$refs.mainContainer.offsetWidth * this.counter);
      this.$refs.slidingContainer.style.left = val + "px";
      this.$refs.thumbSingle[this.counter].classList.add("active");
      this.$refs.thumbSingle[this.counter].style.borderColor = this.selectedThumbnailBorderColor;
    },
    upperSlideLeft() {
      this.counter -= 1;
      this.displayUpper();
      this.clampToUpperRange();
    },
    upperSlideRight() {
      this.counter += 1;
      this.displayUpper();
      this.clampToUpperRange();
    },
    lowerSlideLeft() {
      if (this.images.length <= this.thumbnailsToShow) {
        return;
      } else {
        this.counterThumb -= 1;
        this.displayLower();
        this.clampUpperToRange();
      }
    },
    lowerSlideRight() {
      if (this.images.length <= this.thumbnailsToShow) {
        return;
      } else {
        this.counterThumb += 1;
        this.displayLower();
        this.clampUpperToRange();
      }
    },
    displayLower() {
      if (this.counterThumb < 0) this.counterThumb = 0;
      if (this.counterThumb > this.images.length - this.thumbnailsToShow) this.counterThumb = this.images.length - this.thumbnailsToShow;

      var val = -((this.$refs.mainContainer.offsetWidth * this.counterThumb) / this.thumbnailsToShow);
      this.$refs.slidingThumbContainer.style.left = val + "px";
    },
    clampToUpperRange() {
      if (this.images.length <= this.thumbnailsToShow) {
        return;
      } else {
        var distance = 0;
        if (this.counter > this.counterThumb + this.thumbnailsToShow - 1) {
          distance = this.counter - (this.counterThumb + this.thumbnailsToShow - 1);
        }
        if (this.counter < this.counterThumb) {
          distance = this.counter - this.counterThumb;
        }
        this.counterThumb += distance;
        this.displayLower();
      }
    },
    clampUpperToRange() {
      if (!(this.counter >= this.counterThumb && this.counter < this.counterThumb + this.thumbnailsToShow)) {
        var lowerboundDistance = this.counterThumb - this.counter;
        if (lowerboundDistance < 0) {
          this.counter = this.counterThumb + this.thumbnailsToShow - 1;
        } else {
          this.counter = this.counterThumb;
        }

        this.displayUpper();
      }
    },

    removeBorders() {
      this.$refs.thumbSingle.forEach((single) => {
        single.classList.remove("active");
      });
    },
  },
};
</script>

<style scoped>
.main-image {
  width: 100%;
  height: 100%;
  position: relative;
  background-size: cover;
  background-position: center;
  display: inline-block;
}
.thumb-image {
  width: 20%;
  height: 100%;
  position: relative;
  background-size: cover;
  background-position: center;
  display: inline-block;
}
.active {
  border: 5px solid;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.sliding-container {
  width: 100%;
  height: 100%;
  position: relative;
  left: 0px;
  transition: left 300ms ease-in-out;
}
.sliding-thumb-container {
  width: 100%;
  height: 100%;
  position: relative;
  left: 0px;
  transition: left 300ms ease-in-out;
}
.main-container {
  position: relative;
  white-space: nowrap;
  overflow-x: hidden;
}
.thumb-container {
  position: relative;
  white-space: nowrap;
  overflow-x: hidden;
  margin-top: 1rem;
}
.arrows-container {
  position: absolute;
  pointer-events: none;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 50%;
  transform: translateY(-50%);
}
.left-arrow,
.right-arrow {
  display: inline-block;
  position: absolute;
}
.right-arrow {
  right: 1rem;
}
.left-arrow {
  left: 1rem;
}
.arrow:hover {
  cursor: pointer;
}
.arrow {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: all;
}
.blinder {
  position: absolute;
  height: 100%;
  width: 6rem;
}
.left-blinder {
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.705) 0%, rgba(0, 0, 0, 0) 100%);
  left: 0;
  top: 0;
}
.right-blinder {
  background: rgb(0, 0, 0);
  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.705) 0%, rgba(0, 0, 0, 0) 100%);
  right: 0;
  top: 0;
}
.arrow-icon {
  image-rendering: auto;
  image-rendering: crisp-edges;
}
</style>

