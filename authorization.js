import Base64 from 'crypto-js/enc-base64'
import HmacSHA1 from 'crypto-js/hmac-sha1'
import Utf8 from 'crypto-js/enc-utf8'
import MD5 from 'crypto-js/md5'


// Authorization = "SpektrixAPI3 " + LoginName + ":" + Signature;
function getAuthorization(method, loginName, date, secretKey, urlString, bodyString) {
    const signature = getSignature(secretKey, urlString, bodyString)
    return `SpektrixAPI3 ${loginName}:${signature}`
}

// Signature = BASE-64-ENCODE( HMAC-SHA1( BASE-64-DECODE(SecretKey), UTF-8( StringToSign ) ) );

function getSignature(secretKey, urlString, bodyString) {
    const signedString = getString(method, date, urlString, bodyString)
    const utfSigned = Utf8.stringify(signedString)
    const calculated = HmacSHA1(utfSigned, Base64.parse(secretKey))
    return Base64.stringify(calculated)
}

function getString(method, date, urlString, bodyString) {
    const encodedBody = bodyString ? getBodyString(bodyString):null
    return encodedBody ? `${method}\n${urlString}\n${date}\n${encodedBody}`:`${method}\n${urlString}\n${date}`
}

function getBodyString(bodyString) {
    const encodedBody = UTF8.stringify(bodyString)
    const md5Sum = MD5(encodedBody)
    const encodedMd5 = Base64.stringify(md5Sum)

    return encodedMd5
}

export { getAuthorization }