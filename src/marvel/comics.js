import request from 'request';
import * as util from 'util';
import utils from './utils';
import Q from 'q';

export default function (options) {
    var pubkey = options.publicKey,
        privkey = options.privateKey,
        internals = {};


    internals.find = function (resourceURI, fn) {
        var deferred = Q.defer(),
            ts = utils.timestamp();
        request({
            url: resourceURI,
            json: true,
            qs: {
                ts: ts,
                apikey: pubkey,
                hash: utils.createHash(ts, privkey, pubkey)
            }
        }, function (err, response) {
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


    internals.findAll = function (limit = 10, offset = 0, fn) {
        var deferred = Q.defer(),
            ts = utils.timestamp();

        if (typeof limit === 'function') {
            fn = limit;
            limit = 10;
        }

        if (typeof offset === 'function') {
            fn = offset;
            offset = 0;
        }

        request({
            url: options.apiDomain + options.version + '/public/' + options.resource,
            json: true,
            qs: {
                ts: ts,
                apikey: pubkey,
                hash: utils.createHash(ts, privkey, pubkey),
                limit: limit,
                offset: offset
            }
        }, function (err, response) {
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


    internals.characters = function (id, limit, offset, fn) {
        if (typeof limit === 'function') {
            fn = limit;
            limit = 20;
        }

        if (typeof offset === 'function') {
            fn = offset;
            offset = 0;
        }

        var deferred = Q.defer(),
            ts = utils.timestamp();

        request({
            url: options.apiDomain + options.version + '/public/' + options.resource + util.format('%s/characters', id),
            json: true,
            qs: {
                ts: ts,
                apikey: pubkey,
                hash: utils.createHash(ts, privkey, pubkey),
                limit: limit || 20,
                offset: offset || 0
            }
        }, function (err, response) {
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
    return internals;
};