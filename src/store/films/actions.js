import * as type from './types'
import {_list } from '@/services/films'
const actions = {
  fetchFilms ({ commit }) {
    _list().then(films => {
      commit(type.FILMS, {
        payload: films
      })
    })
  }
}

export default actions
