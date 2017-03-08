export const STORAGE_KEY = 'favourites';

export const state = {
    showComic: {},
    dataComics: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
}

export const mutations = {
    add (state, { comic }) {
        let validate = state.dataComics.find(
            (item) => {
                if (comic.id === item.id)
                {
                    return true
                }else{
                    return false
                }
            }
        );
        if (!validate){
            state.dataComics.push({
                id: JSON.parse(JSON.stringify(comic.id)),
                thumbnail: JSON.parse(JSON.stringify(comic.thumbnail)),
                title: JSON.parse(JSON.stringify(comic.title))
            });
            localStorage[STORAGE_KEY] = JSON.stringify(state.dataComics);            
        }

    },
    setComic (state, { response }) {
        state.showComic = response.data.shift();
    },
    delete (state, { comic }) {
        let deleteComic =  state.dataComics.find(
            (item) => {
                if (comic.id === item.id)
                {
                    return item
                }
            }
        );
        state.dataComics.splice(state.dataComics.indexOf(deleteComic), 1);
        localStorage[STORAGE_KEY] = JSON.stringify(state.dataComics);
    }
}