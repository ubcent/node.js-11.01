<template>
  <form>
    <el-input
      placeholder="Заголовок"
      v-model="input.title"
      class="my-input">
    </el-input>
    <el-input
      type="textarea"
      :rows="5"
      placeholder="Please input"
      v-model="input.content"
      class="my-input">
    </el-input>
    <el-button type="primary" @click="sendPost">Отправить</el-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      input: {
        title: '',
        content: '',
      },
    };
  },
  methods: {
    sendPost() {
      this.$store.dispatch('sendPost', this.input);
    },
  },
};
</script>

<style lang="sass">
.my-input
  margin-bottom: 15px
</style>
// eslint-disable-next-line
