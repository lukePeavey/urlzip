const mongoose = require('mongoose')

/**
 * The database model for links.
 */
const LinkSchema = mongoose.Schema({
  original: {type: String, required: true},
  short: { type: String, require: true },
  slug: { type: String, required: true },
})

module.exports = {
  Link: mongoose.model('link', LinkSchema),
}
