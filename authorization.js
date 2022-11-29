import Base64 from 'crypto-js/enc-base64.js'
import HmacSHA1 from 'crypto-js/hmac-sha1.js'
import MD5 from 'crypto-js/md5.js'
import UTF8 from 'crypto-js/enc-utf8.js'


// Authorization = "SpektrixAPI3 " + LoginName + ":" + Signature;
function getAuthorization(method, loginName, date, secretKey, urlString, bodyString) {
    const signature = getSignature(method, date, secretKey, urlString, bodyString)
    return `SpektrixAPI3 ${loginName}:${signature}`
}

// Signature = BASE-64-ENCODE( HMAC-SHA1( BASE-64-DECODE(SecretKey), UTF-8( StringToSign ) ) );

function getSignature(method, date, secretKey, urlString, bodyString) {
    const signedString = getString(method, date, urlString, bodyString)
    const calculated = HmacSHA1(signedString, Base64.parse(secretKey))
    return Base64.stringify(calculated)
}

function getString(method, date, urlString, bodyString) {
    const encodedBody = bodyString ? getBodyString(bodyString):null
    return encodedBody ? `${method}\n${urlString}\n${date}\n${encodedBody}`:`${method}\n${urlString}\n${date}`
}

function getBodyString(bodyString) {
    const md5Sum = MD5(JSON.stringify(bodyString))
    const encodedMd5 = Base64.stringify(md5Sum)
    return encodedMd5
}

export { getAuthorization }