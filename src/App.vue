<template>
  <div id="app">
    <form id="u-search" method="post" name="search" v-on:submit.prevent="onFormSubmit">
      <input name="userId" placeholder="userId">
      <input type="submit" value="Search">
    </form>
    <datatables id="dt-autor" ref="dtAutor" :autoload="dtAutoload" :config="dtConfig" :class="dtTableClass" @ver-autor="verAutor"></datatables>
  </div>
</template>

<script>
import $ from 'jquery'
import Datatables from './components/Datatables'
import configDt1 from './config/dt1.js'

export default {
  name: 'app',
  components: {
    Datatables
  },
  data () {
    return {
      dtConfig: configDt1,
      dtTableClass: 'table table-bordered',
      dtAutoload: false,
      baseUrl: configDt1.ajax.url
    }
  },
  methods: {
    onFormSubmit (ev) {
      let form = ev.target
      let params = $(form).serialize()
      this.$refs.dtAutor.fetchData(this.composeUrl(this.baseUrl, params))
    },
    composeUrl (url, params) {
      return `${url}?${params}`
    },
    verAutor (rowData, ev) {
      console.log(rowData)
    }
  }
}
</script>

<style lang="scss">
#app {
  box-sizing: border-box;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px 10px 10px;
  width: 100%;

  #dt-autor {
    width: 90%;
  }
}
</style>
