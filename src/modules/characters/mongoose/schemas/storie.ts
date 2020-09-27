import mongoose, { Schema } from "mongoose";

const StoriesSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  resourceURI: String,
  type: String,
  modified: String,
  thumbnail: Array,
  comics: Object,
  series: Object,
  events: Object,
  characters: Object,
  creators: Object,
  originalissue: Object,
});

export default mongoose.model("stories", StoriesSchema);
