<template>
  <v-card>
    <v-card-title class="headline">
      <h3>{{ data.title }}</h3>
    </v-card-title>
    <v-card-text>
      <img
        v-if="data.urlToImage"
        :src="data.urlToImage"
        :alt="data.title"
        class="article__image"
      >
      <p>{{ data.description }}</p>
    </v-card-text>
    <v-card-actions>
      <a :href="data.url">
        Read more
      </a>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    }
  },
};
</script>

<style lang="stylus" scoped>
.article
  &__image
    height 300px
</style>
