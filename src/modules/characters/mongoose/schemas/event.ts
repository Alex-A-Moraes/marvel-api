import mongoose, { Schema } from "mongoose";

const EventsSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  resourceURI: String,
  urls: Array,
  modified: String,
  start: String,
  end: String,
  thumbnail: Array,
  comics: Object,
  stories: Object,
  series: Object,
  characters: Object,
  creators: Object,
  next: Object,
  previous: Object,
});

export default mongoose.model("events", EventsSchema);
