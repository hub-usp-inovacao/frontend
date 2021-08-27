<template>
  <LastUpdated :label="label" :last-updated="lastUpdated">
    <v-file-input
      chips
      :label="label"
      accept="image/*"
      @change="handleImage"
    ></v-file-input>
    <v-img
      v-if="showImage"
      :src="imageSrc"
      max-width="250"
      max-height="250"
    ></v-img>
  </LastUpdated>
</template>

<script>
import LastUpdated from "@/components/CompanyForms/inputs/LastUpdated.vue";

export default {
  components: { LastUpdated },
  props: {
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
      default: undefined,
    },
    lastUpdated: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data: () => ({
    image: undefined,
    imageUrl: undefined,
  }),
  computed: {
    imageSrc: {
      get() {
        return this.imageUrl !== undefined ? this.imageUrl : this.url;
      },
      set(newValue) {
        this.imageUrl = newValue;
      },
    },
    showImage() {
      return this.image || this.imageSrc;
    },
  },
  methods: {
    handleImage(newImage) {
      this.image = newImage;
      this.imageSrc = newImage ? URL.createObjectURL(this.image) : "";
      this.$emit("input", this.image);
    },
  },
};
</script>
