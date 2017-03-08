import request from 'request';
import * as util from 'util';
import utils from './utils';
import Q from 'q';

const criteria = {
    name: '',
    offset: 0,
    limit: 10,
    order: 'name'
}


export default function(options) {
    let pubkey = options.publicKey,
        privkey = options.privateKey,
        internals = {};

    internals.findAllOrderBy = function(criteriaVal, fn) {
        let deferred = Q.defer(),
            ts = utils.timestamp();
        const criteriaValue = getCriteriaValue(criteriaVal);

        if (typeof limit === 'function') {
            fn = limit;
            limit = criteria.limit;
        }

        if (typeof offset === 'function') {
            fn = offset;
            offset = criteria.offset;
        }

        request({
            url: options.apiDomain + options.version + '/public/' + options.resource,
            json: true,
            qs: {
                orderBy: criteriaValue.order,
                ts: ts,
                apikey: pubkey,
                hash: utils.createHash(ts, privkey, pubkey),
                limit: criteriaValue.limit,
                offset: criteriaValue.offset
            }
        }, function(err, response) {
            if (err) {
                return deferred.reject(err);
            }

            if (response.statusCode !== 200) {
                return deferred.reject(new Error(response.body));
            }

            deferred.resolve(utils.formatResponse(response.body));

        });

        return deferred.promise.nodeify(fn);
    };

    internals.findAll = function(criteriaVal, fn) {
        let deferred = Q.defer(),
            ts = utils.timestamp();
        const criteriaValue = getCriteriaValue(criteriaVal);

        if (typeof limit === 'function') {
            fn = limit;
            limit = criteria.limit;
        }

        if (typeof offset === 'function') {
            fn = offset;
            offset = criteria.offset;
        }

        request({
            url: options.apiDomain + options.version + '/public/' + options.resource,
            json: true,
            qs: {
                ts: ts,
                apikey: pubkey,
                hash: utils.createHash(ts, privkey, pubkey),
                limit: criteriaValue.limit,
                offset: criteriaValue.offset
            }
        }, function(err, response) {
            if (err) {
                return deferred.reject(err);
            }

            if (response.statusCode !== 200) {
                return deferred.reject(new Error(response.body));
            }

            deferred.resolve(utils.formatResponse(response.body));

        });

        return deferred.promise.nodeify(fn);
    };


    internals.findNameStartsWith = function(criteriaVal, fn) {
        let deferred = Q.defer(),
            ts = utils.timestamp();
        const criteriaValue = getCriteriaValue(criteriaVal);

        request({
            url: options.apiDomain + options.version + '/public/' + options.resource,
            json: true,
            qs: {
                orderBy: criteriaValue.order,
                ts: ts,
                apikey: pubkey,
                hash: utils.createHash(ts, privkey, pubkey),
                offset: criteriaValue.offset,
                limit: criteriaValue.limit,
                nameStartsWith: criteriaValue.name
            }
        }, function(err, response) {
            if (err) {
                return deferred.reject(err);
            }

            if (response.statusCode !== 200) {
                return deferred.reject(new Error(response.body));
            }

            deferred.resolve(utils.formatResponse(response.body));

        });

        return deferred.promise.nodeify(fn);
    };

    internals.find = function(id, fn) {
        let deferred = Q.defer(),
            ts = utils.timestamp();

        request({
            url: options.apiDomain + options.version + '/public/' + options.resource + id,
            json: true,
            qs: {
                ts: ts,
                apikey: pubkey,
                hash: utils.createHash(ts, privkey, pubkey)
            }
        }, function(err, response) {
            if (err) {
                return deferred.reject(err);
            }

            if (response.statusCode !== 200) {
                return deferred.reject(new Error(response.body));
            }

            deferred.resolve(utils.formatResponse(response.body));

        });

        return deferred.promise.nodeify(fn);
    };

    internals.comics = function(id, fn) {

        var deferred = Q.defer(),
            ts = utils.timestamp();

        request({
                url: options.apiDomain + options.version + '/public/' + options.resource + util.format('/%s/comics', id), 
                json: true, 
                qs: {
                        ts: ts,
                        apikey: pubkey,
                        hash: utils.createHash(ts, privkey, pubkey)
                    }
                },
                function(err, response) {
                    if (err) {
                        return deferred.reject(err);
                    }

                    if (response.statusCode !== 200) {
                        return deferred.reject(new Error(response.body));
                    }

                    deferred.resolve(utils.formatResponse(response.body));

                });

            return deferred.promise.nodeify(fn);
        };

        function getCriteriaValue(criteriaValue) {
            return {
                name: criteriaValue.name ? criteriaValue.name : criteria.name,
                offset: criteriaValue.offset ? criteriaValue.offset : criteria.offset,
                limit: criteriaValue.limit ? criteriaValue.limit : criteria.limit,
                order: criteriaValue.order ? criteriaValue.order : criteria.order
            };
        };


        return internals;
    };