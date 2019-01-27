<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <h1>The best news aggregator</h1>
      <v-layout wrap align-center>
        <v-flex
          class="news__filter"
          xs12
          sm6
          d-flex
        >
          <v-text-field
            v-model="keyword"
            label="Keyword"
            append-icon="search"
            @input="$emit('keywordInput', keyword)"
          />
        </v-flex>
        <v-flex
          class="news__filter"
          xs8
          sm4
          d-flex
        >
          <v-select
            v-model="category"
            :items="categories"
            label="Category"
            @input="$emit('categoryInput', category)"
          />
        </v-flex>
        <v-flex
          class="news__filter"
          xs4
          sm2
          d-flex
        >
          <v-select
            v-model="country"
            :items="countries"
            label="Country"
            @input="$emit('countryInput', country)"
          />
        </v-flex>
      </v-layout>
      <article-cont
        v-for="(article, index) in data"
        :key="index"
        :article="article"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import ArticleCont from '~/containers/Article.vue';

export default {
  components: {
    ArticleCont,
  },

  props: {
    data: {
      type: Array,
      default: () => [],
    }
  },

  data() {
    return {
      categories: [
        'business',
        'entertainment',
        'general',
        'health',
        'science',
        'sports',
        'technology',
      ],
      countries: [
        'ru',
        'eg',
        'fr',
        'us',
        'ua',
      ],
      keyword: '',
      category: '',
      country: 'ru',
    };
  },
};
</script>

<style lang="stylus" scoped>
.news
  &__filter
    padding 0 10px
</style>
