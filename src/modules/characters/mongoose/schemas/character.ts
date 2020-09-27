import mongoose, { Document, Schema, Model } from "mongoose";

export type CharactersDocument = Document & {
  id: string;
  name: string;
  description: string;
  modified: string;
  thumbnail: object;
  resourceURI: string;
  comics: string[];
  series: string[];
  stories: string[];
  events: string[];
  urls: string[];
};

type CharactersModel = Model<CharactersDocument>;

const CharactersSchema = new Schema({
  id: String,
  name: String,
  description: String,
  modified: String,
  thumbnail: Object,
  resourceURI: String,
  comics: [
    {
      type: Schema.Types.ObjectId,
      ref: "comics",
    },
  ],
  series: [
    {
      type: Schema.Types.ObjectId,
      ref: "series",
    },
  ],
  stories: [
    {
      type: Schema.Types.ObjectId,
      ref: "stories",
    },
  ],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "events",
    },
  ],
  urls: Array,
});

export default mongoose.model<CharactersDocument, CharactersModel>(
  "characters",
  CharactersSchema
);
