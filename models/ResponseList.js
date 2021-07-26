const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResponseList = new Schema({
  responses: [
    {
      answers: [Schema.Types.Mixed],
      date: { type: Date, default: Date.now },
    },
  ],
});

const ResponseListModel = mongoose.model("ResponseList", ResponseList);
module.exports = ResponseListModel;
