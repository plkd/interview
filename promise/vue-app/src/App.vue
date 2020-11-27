<template>
  <div id="app">
    {{message}}
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      message: '未更新'
    }
  },
  mounted() {
    this.updateMessage()
  },
  methods: {
    async updateMessage() {
      this.message = '已更新'
      console.log(this.$el)
      console.log(this.$el.textContent) // => '未更新'
      await this.$nextTick()
      console.log(this.$el.textContent) // => '已更新'

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
