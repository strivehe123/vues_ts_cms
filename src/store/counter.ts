import { defineStore } from 'pinia'
const useCounterStore = defineStore('counter', {
  state: () => ({
    sum: 11
  }),
  getters: {
    dounleSum(state) {
      return state.sum * 2
    }
  },
  actions: {
    changeSumAction(newSum: number) {
      this.sum = newSum
    }
  }
})

export default useCounterStore
