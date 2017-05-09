import Vue from 'vue'
import Datatables from '@/components/Datatables'

describe('Datatables.vue', () => {
  it('should be a datatable after mount', () => {
    const Constructor = Vue.extend(Datatables)
    const vm = new Constructor().$mount()
    expect(vm.isLoaded).to.equal(true)
  })
})
