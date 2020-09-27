import mongoose, { Schema } from "mongoose";

const SeriesSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  resourceURI: String,
  urls: Array,
  startYear: Number,
  endYear: Number,
  rating: String,
  modified: String,
  thumbnail: Array,
  comics: Array,
  stories: Array,
  events: Array,
  characters: Array,
  creators: Array,
  next: Object,
  previous: Object,
});

export default mongoose.model("series", SeriesSchema);
