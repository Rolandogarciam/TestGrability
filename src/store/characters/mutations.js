export const STORAGE_KEY = 'favorite-comics'

export const state = {
    dataCharacters: [],
    records: 0
}

export const mutations = {
    setList (state, { response }) {
        state.records = response.meta.total;
        state.dataCharacters = response.data;
    }
}