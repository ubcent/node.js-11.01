<template>
  <el-card class="box-card box-my">
    <div slot="header" class="clearfix">
      <span>{{ item.title }}</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="deletePost">Удалить</el-button>
    </div>
    <div class="text item">
      {{ item.content }}
    </div>
  </el-card>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    deletePost() {
      this.$store.dispatch('deletePost',this.item.id);
    },
  },
};
</script>

<style lang="sass">
.box-my
  margin-bottom: 15px
</style>

