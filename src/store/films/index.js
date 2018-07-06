import * as type from './types'
import actions from './actions'
const state = {
  films: []
}

const mutations = {
  [type.FILMS] (state, {payload}) {
    state.films = [...payload.slice()]
  }
}

export default {
  state,
  mutations,
  actions
}
