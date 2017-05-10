<template>
  <table :class="tableClass"></table>
</template>

<script>
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/jquery.dataTables.css'
import defaults from './defaults.js'

export default {
  name: 'datatables',
  props: ['config', 'tableClass'],
  computed: {
    isLoaded () {
      return $.fn.dataTable.isDataTable(this.$el)
    }
  },
  methods: {
    init () {
      let dtConfig = Object.assign({}, defaults, this.config)
      $(this.$el).DataTable(dtConfig)
    },
    fetchData (from) {
      this.isLoaded && $(this.$el).DataTable().ajax.url(from).load()
    },
    refresh (resetPaging) {
      this.isLoaded && $(this.$el).DataTable().ajax.reload(null, !!resetPaging)
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
          vm.$emit(`dtw:${$btn.data('action')}`, rowData, ev)
        }
      })
    },
    bindError () {
      let vm = this
      // Disable default error mode (alert) from DataTables
      $.fn.dataTable.ext.errMode = 'none'
      $(vm.$el).on('error.dt', (e, settings, techNote, message) => {
        vm.$emit('dtw:error', { settings, techNote, message })
      })
    }
  },
  mounted () {
    this.init()
    this.bindClick()
    this.bindError()
  }
}
</script>
