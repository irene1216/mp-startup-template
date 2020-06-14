const env = require('config.js'); //配置文件，在这文件里配置你的OSS keyId和KeySecret,timeout:87600;

const base64 = require('base64.js');//Base64,hmac,sha1,crypto相关算法
require('hmac.js');
require('sha1.js');
const Crypto = require('crypto.js');

const uploadFile = function (filePath, dir, successc, failc) {
  console.log("WHYYYYYYYYYYYYYY", filePath)
  if (!filePath || filePath.length < 9) {
    wx.showModal({
      title: 'Error',
      content: 'Please retry',
      showCancel: false,
    })
    return;
  }

  console.log('Uploading photos');
  const aliyunFileKey = dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';

  const aliyunServerURL = env.uploadImageUrl;
  const accessid = env.OSSAccessKeyId;
  const policyBase64 = getPolicyBase64();
  const signature = getSignature(policyBase64);

  wx.uploadFile({
    url: aliyunServerURL,
    filePath: filePath,
    name: 'file',
    formData: {
      'key': aliyunFileKey,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'signature': signature,
      'success_action_status': '200',
    },
    success: function (res) {
      console.log(signature)
      if (res.statusCode != 200) {
        failc(new Error('上传错误:' + JSON.stringify(res)))
        return;
      }
      // successc(aliyunServerURL + '/' + aliyunFileKey + '?x-oss-process=style/square');
      successc(aliyunServerURL + '/' + aliyunFileKey);

    },
    fail: function (err) {
      err.wxaddinfo = aliyunServerURL;
      failc(err);
    },
  })
}

const getPolicyBase64 = function () {
  let date = new Date();
  date.setHours(date.getHours() + env.timeout);
  let srcT = date.toISOString();
  const policyText = {
    "expiration": srcT, 
    "conditions": [
      ["content-length-range", 0, 5 * 1024 * 1024] 
    ]
  };

  const policyBase64 = base64.encode(JSON.stringify(policyText));
  return policyBase64;
}

const getSignature = function (policyBase64) {
  const accesskey = env.AccessKeySecret;

  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);

  return signature;
}

module.exports = uploadFile;