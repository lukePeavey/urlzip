require('dotenv').config()
const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const uid = require('shortid')
const url = require('url')
const { Link } = require('./config/database')

// Setup App
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
nunjucks.configure('views', { autoescape: true, express: app })

// Initialize database connection
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE_URL, { useMongoClient: true })

// Serve the homepage
app.get('/', (req, res) => res.render('index.html'))

/**
 * Handle API Requests
 * @param {String} req.params.url the full url to shorten
 */
app.get('/api/:url(*)', async (req, res, next) => {
  try {
    const { href } = url.parse(req.params.url)
    if (!href) {
      throw new Error('You must provide a valid URL')
    }
    const slug = uid.generate()
    const short = `${process.env.HOST}/${slug}`

    await new Link({ original: href, short, slug }).save()
    res.status(200).json({ original: href, short })
  } catch (error) {
    res.json({ original: null, short: null, error: 'Request Failed' })
  }
})

/**
 * Redirects short urls to the original
 */
app.get('/:slug', async (req, res, next) => {
  try {
    const slug = req.params.slug
    const link = await Link.findOne({ slug })
    if (link) {
      res.redirect(link.original)
    } else {
      res.redirect('/')
    }
  } catch (error) {}
})

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port)
})
