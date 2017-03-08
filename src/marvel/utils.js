import crypto from 'crypto'

const timestamp = function() {
  return parseInt(Date.now() / 1000, 10);
};

const createHash = function(ts, privkey, pubkey) {
  var preHash = ts + privkey + pubkey
    , hash    = crypto.createHash('md5').update(preHash).digest('hex');

  return hash;
};

const formatResponse = function(body) {
  var res = {};

  res.data = body.data.results;
  res.meta = {
    offset: body.data.offset
  , limit: body.data.limit
  , total: body.data.total
  , count: body.data.count
  };

  return res;
};

export default { createHash, formatResponse, timestamp }
