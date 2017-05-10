<template>
  <div id="app">
    <form name="search" v-on:submit.prevent="onSearch">
      <input name="userId" placeholder="Type in the User ID...">
      <input type="submit" value="search">
      <button type="button" @click="refreshReset">refresh with paging reset</button>
      <button type="button" @click="refreshKeep">refresh without paging reset</button>
    </form>
    <datatables ref="dtwUser"
      :config="dtwConfig"
      :tableClass="dtwClass"
      @dtw:error="handleError"
      @dtw:userEvent="handleUserEvent">
    </datatables>
  </div>
</template>

<script>
import $ from 'jquery'
import Datatables from '../src/components/Datatables'
import config from './config.js'

export default {
  name: 'app',
  components: {
    Datatables
  },
  data () {
    return {
      dtwBaseUrl: config.ajax.url,
      dtwClass: 'vue-dtw',
      dtwConfig: config
    }
  },
  methods: {
    onSearch (ev) {
      let form = ev.target
      let params = $(form).serialize()
      let fromUrl = `${this.dtwBaseUrl}?${params}`
      this.$refs.dtwUser.fetchData(fromUrl)
    },
    refreshReset () {
      let reset = true
      this.$refs.dtwUser.refresh(reset)
    },
    refreshKeep () {
      this.$refs.dtwUser.refresh()
    },
    handleUserEvent (rowData, ev) {
      console.log(rowData)
    },
    handleError (dtError) {
      console.log(dtError)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

#app {
  background: #f5f5f5;
  font-family: monospace;
  padding: 20px;

  form {
    display: flex;
    justify-content: center;
  }

  .vue-dtw {
    border: 1px solid #ccc;
    border-radius: 3px;
  }
}
</style>
