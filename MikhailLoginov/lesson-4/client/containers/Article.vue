<template>
  <Article
    :data="article"
  />
</template>

<script>
import Article from '~/components/Article.vue';

export default {
  components: {
    Article,
  },

  props: {
    article: {
      default: () => {},
      type: Object,
    }
  },
};
</script>
