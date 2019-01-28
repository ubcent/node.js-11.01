<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Post v-for="item in getPosts" :key="item.id" :item="item"/>
    <FormInput></FormInput>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue';
import FormInput from '@/components/Form.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  computed: {
    ...mapGetters(['getPosts']),
  },
  components: {
    Post,
    FormInput,
  },
};
</script>
