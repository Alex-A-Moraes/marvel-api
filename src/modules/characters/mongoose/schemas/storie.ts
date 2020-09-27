import mongoose, { Schema } from "mongoose";

const StoriesSchema = new Schema({
  id: String,
  title: String,
  description: String,
  resourceURI: String,
  type: String,
  modified: String,
  thumbnail: Array,
  comics: Array,
  series: Array,
  events: Array,
  characters: Array,
  creators: Array,
  originalissue: Object,
});

export default mongoose.model("stories", StoriesSchema);
