import Marvel from '../marvel';
import config from '../config';

var marvel = new Marvel({
    publicKey: config.PUBLIC_KEY,
    privateKey: config.PRIVATE_KEY
});

const limitDefault = 10;

export function fetchCharacters(page) {
    return marvel.api.characters.findAll(limitDefault);
};

export function fetchCharactersOrder(page, order) {
    const criteria = getValueCriteria(page,limitDefault, order);
    return marvel.api.characters.findAllOrderBy(criteria);
};

export function searchCharacters(name, page, order) {
    const criteria = getValueCriteria(page,limitDefault, order);
    criteria.name = name;
    return marvel.api.characters.findNameStartsWith(criteria);
};

export function findComic(resourceURI) {
    return marvel.api.comics.find(resourceURI);
};

export function findComicsByCharacter(id) {
    return marvel.api.characters.comics(id);
};

function getValueCriteria( page, limit, order ) {
    return {
        offset: 10 * page - 10,
        limit: limit ? limit : limitDefault,
        order: order ? '-name' : 'name'
    };
};