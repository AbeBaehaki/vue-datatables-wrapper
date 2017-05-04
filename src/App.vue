<template>
  <div id="app">
    <form name="search" v-on:submit.prevent="onFormSubmit">
      <input name="userId" placeholder="userId">
      <input type="submit" value="Search">
    </form>
    <datatables ref="dtAutor" :config="dtConfig" :class="dtTableClass" @dt-error="handleError" @userEvent="handleUserEvent"></datatables>
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
      dtTableClass: 'datatable',
      baseUrl: configDt1.ajax.url
    }
  },
  methods: {
    onFormSubmit (ev) {
      let form = ev.target
      let params = $(form).serialize()
      let fromUrl = this.composeUrl(this.baseUrl, params)
      this.$refs.dtAutor.fetchData(fromUrl)
    },
    composeUrl (url, params) {
      return `${url}?${params}`
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 20px;

  form {
    display: flex;
    justify-content: center;
  }

  .datatable {
    border: 1px solid #ccc;
    border-radius: 3px;
  }
}
</style>
