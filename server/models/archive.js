const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const archiveSchema = new Schema({
  archiveDate: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: String,
    required: true,
    default: "Alvin",
  },
  archiveData: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

module.exports = mongoose.model("Archive", archiveSchema);
