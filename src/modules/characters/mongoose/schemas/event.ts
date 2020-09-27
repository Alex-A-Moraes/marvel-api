import mongoose, { Schema } from "mongoose";

const EventsSchema = new Schema({
  id: String,
  title: String,
  description: String,
  resourceURI: String,
  urls: Array,
  modified: String,
  start: String,
  end: String,
  thumbnail: Array,
  comics: Array,
  stories: Array,
  series: Array,
  characters: Array,
  creators: Array,
  next: Object,
  previous: Object,
});

export default mongoose.model("events", EventsSchema);
