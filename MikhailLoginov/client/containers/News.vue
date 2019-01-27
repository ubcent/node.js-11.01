<template>
  <news
    :data="data"
    @keywordInput="keywordInput"
    @categoryInput="categoryInput"
    @countryInput="countryInput"
  />
</template>

<script>
import News from '~/components/News.vue';

export default {
  components: {
    News,
  },

  data() {
    return {
      data: [],
      keyword: '',
      category: '',
      country: 'ru',
    };
  },

  async created() {
    this.data = await this.getNews();
  },

  methods: {
    async getNews(keyword = '', category = '', country = 'ru') {
      const res = await fetch('http://localhost:3005/api/news', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          keyword,
          category,
          country,
        })
      });

      if (res.status !== 200) {
        return null;
      }

      const json = await res.json();
      if (!json.articles) {
        return null;
      } else {
        return json.articles;
      }
    },
    async keywordInput(keyword) {
      this.keyword = keyword;
      this.data = await this.getNews(this.keyword, this.category, this.country);
    },
    async categoryInput(category) {
      this.category = category;
      this.data = await this.getNews(this.keyword, this.category, this.country);
    },
    async countryInput(country) {
      this.country = country;
      this.data = await this.getNews(this.keyword, this.category, this.country);
    },
  }
};
</script>
