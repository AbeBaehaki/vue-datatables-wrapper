<template>
  <div class="datatable-container" v-if="loaded">
    <table :class="tableClass"></table>
  </div>
</template>

<script>
import $ from 'jquery'
import 'datatables.net'
import 'bootstrap/dist/css/bootstrap.css'
import 'datatables.net-bs/js/dataTables.bootstrap.js'
import 'datatables.net-bs/css/dataTables.bootstrap.css'

export default {
  name: 'datatables',
  props: ['autoload', 'config', 'tableClass'],
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    init () {
      $(this.$el).DataTable(this.config)
      this.toggleLoaded()
    },
    fetchData (from) {
      !this.loaded && this.init()
      $(this.$el).DataTable().ajax.url(from).load()
    },
    toggleLoaded () {
      this.loaded = !this.loaded
    },
    bindClick () {
      let vm = this
      // Trigger event when inner link|button is clicked
      $(vm.$el).on('click', 'a, button', function (ev) {
        ev.preventDefault()
        let $btn = $(this)
        // The 'data-action' prop holds the event name
        if ($btn.data('action')) {
          let rowData = $(vm.$el).DataTable().row($btn.parents('tr')).data()
          vm.$emit($btn.data('action'), rowData, ev)
        }
      })
    },
    bindError () {
      $(this.$el).on('error.dt', function (e, settings, techNote, message) {
        console.error('An error has been reported by DataTables: ', message)
      })
    }
  },
  mounted () {
    this.autoload && this.init()
    this.bindClick()
    this.bindError()
  }
}
</script>

<style lang="scss">
.datatable-container {
  padding: 10px;
}
</style>
