// constant.js
// 设置了密码盐值以及token的secretKey
const crypto = require('crypto');

module.exports = {
  MD5_SUFFIX: '我是一个固定长度的盐值',
  md5: (pwd) => {
    let md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex');
  },
  secretKey: 'secretKeyForDemo'
};