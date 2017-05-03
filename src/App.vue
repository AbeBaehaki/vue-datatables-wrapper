<template>
  <div id="app">
    <form name="search" v-on:submit.prevent="onFormSubmit">
      <input name="userId" placeholder="userId">
      <input type="submit" value="Search">
    </form>
    <datatables ref="dtAutor" :config="dtConfig" :class="dtTableClass" @dt-error="catchError" @ver-autor="verAutor"></datatables>
  </div>
</template>

<script>
import $ from 'jquery'
import Datatables from './components/Datatables'
import configDt1 from './config/datatables/dt1.js'

export default {
  name: 'app',
  components: {
    Datatables
  },
  data () {
    return {
      dtConfig: configDt1,
      dtTableClass: 'table table-bordered datatable',
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
    },
    catchError (dtError) {
      console.log(dtError)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 20px;
  box-sizing: border-box;

  .datatable {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
