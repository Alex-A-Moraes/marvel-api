import { model, Schema } from 'mongoose';

const CharactersSchema = new Schema({
    id: Number,
    name: String,
    description: String,
    modified: String,
    resourceURI: String,
    comics: Object,
    series: Object,
    stories: Object,
    events: Object,
    urls: Object,
});

const CharactersModel = model('characters', CharactersSchema);

export default CharactersModel;
