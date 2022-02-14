const mongoose = require("mongoose")

module.exports = function getNextSequence(name) {
  const ret = mongoose.model.findAndModify({
    query: { _id: name },
    update: { $inc: { seq: 1 } },
    new: true
  })
  return ret.seq
}
