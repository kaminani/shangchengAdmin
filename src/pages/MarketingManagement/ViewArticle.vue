<template>
  <div>
    <h3 style="text-align: center;">{{title}}</h3>
    <p style="margin-top: 5%;font-size: 18px;">{{content}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      title: ""
    };
  },
  mounted() {
    this.content = this.$route.params.data.content;
    this.title = this.$route.params.data.title;
  }
};
</script>

<style>
</style>