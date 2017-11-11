
url zip
=========================
A URL shortener micro service.

## Stack
- Node
- Express
- Mongo DB
- Mongoose

-----

##  What it does
Shortens URLs, making it easier to share/publish links. Many apps like twitter and Facebook use URL shorteners to generate the links that are included in tweets or posts.

## Documentation

### Request
API requests should be made to urlzip.me/api/:url
- __url__: (required) The full url that you want to shorten.

### Response
The response will be a JSON object with the following properties
- __original__: {String|null} The original url
- __short__: {String|null} The shortened version of the url
- __error__: {String|null} The error message if the request failed

### Example Usage
```js
async function shortenLink(link) {
  try {
    const response = await fetch(`https://urlzip.me/api/${link}`)
    const { original, short } = await response.json()
    // Do something with the shortened url
  } catch (error) {
    // handler error
  }
}
```
