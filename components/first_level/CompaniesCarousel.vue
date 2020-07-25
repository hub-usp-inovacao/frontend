<template>
  <v-carousel
    hide-delimiters
    cycle
    continuous
    interval="2500"
    :show-arrows="false"
    :height="carouselHeight"
  >
    <v-carousel-item v-for="(nowDisplaying, i) in displayCompanies.nowDisplaying" :key="i">
      <v-container>
        <v-row>
          <v-col :cols="displayCompanies.cols" v-for="({ name, src }) in nowDisplaying" :key="name">
            <v-img eager class="mx-auto" width="20rem" height="auto" :src="src"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        src:
          "https://drive.google.com/uc?export=view&id=1wlVqGF7XrvQWScy_liP3L0sbF3vjUoJi",
        name: "99",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1aQaucjPg_6Ifb4WDCTz_8nbKs_yNDUwp",
        name: "baumer",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1SUtOmiAlC7H8bZswehIG87lxRipjw1W6",
        name: "buscapé",
      },
      {
        src:
          "https://drive.google.com/uc?export=file&id=1TZjFnwmB_qKXtOKUtULVIREqK1NWIVhW",
        name: "cosan",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1FExBxIvaCwmUERgoBQoqu3K8LLoVMuS5",
        name: "duratex",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1iXAS5HXwVO10G5pcL__OACVBXKghSz9_",
        name: "farmarin",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1KBl08tUUxtUG_aT82XPztGG1b8M8GueY",
        name: "koppert",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1ocm-CeAaPlSiw5xwW54qCHzYtm9RRCCe",
        name: "nubank",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=19c6TUhcU4hK5o2IwRit_4IumOtlsT9x_",
        name: "scopus",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1dHEZ6Bgm4p1K3Zo3EypJKFjZ2L5DW9UF",
        name: "totvs",
      },
    ],
  }),
  computed: {
    displayCompanies() {
      const cpp = ["xs", "sm"].includes(this.$vuetify.breakpoint.name) ? 1 : 3;

      const nowDisplaying = this.items.reduce((matrix, el, i) => {
        return matrix.concat([(i % cpp == 0 ? [] : matrix.pop()).concat(el)]);
      }, []);

      return {
        nowDisplaying,
        cols: Math.ceil(12 / cpp),
      };
    },
    carouselHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "20rem";
        case "sm":
          return "20rem";
        case "md":
          return "25rem";
        case "lg":
          return "30rem";
        case "xl":
          return "30rem";
      }
    },
  },
};
</script>