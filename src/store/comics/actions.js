import * as api from '../../api';

export const actions = {    
    randomComics: ({ commit, dispatch }, id) => {
        return api.findComicsByCharacter(id)
                .then( response => {
                    let comic;
                    if (response.data.length > 0){
                        comic = response.data.shift();
                    }
                    commit('add', { comic });
        });                
    },
    findComic: ({ commit, dispatch }, resourceURI ) => {
        return api.findComic(resourceURI).then( response => commit('setComic', {  response }) );  
    }
}