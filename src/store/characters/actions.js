import * as api from '../../api'

export const actions = {
    fetchCharacters: ({ commit, dispatch }, page) => {      
        return api.fetchCharacters(page).then( response =>  commit('setList', { response }) );
    },
    fetchCharactersOrder: ({ commit, dispatch }, { page, orderBy }) => {      
        return api.fetchCharactersOrder(page, orderBy).then( response =>  commit('setList', { response }) );
    },
    searchCharacters: ({ commit, dispatch }, { data, page, orderBy }) => {
        return api.searchCharacters(data, page, orderBy).then( response =>  commit('setList', { response }) );
    }
}