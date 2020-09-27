import Characters, { CharactersDocument } from "../mongoose/schemas/character";
import "../mongoose/schemas/storie";
import { Filter, FilterRegex } from "../../../util";

interface Request {
  charactersId?: number;
  name?: string;
  limit?: number;
  offset?: number;
}

interface Response {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: string[];
}

const ResponseCharactersStory = (param: any) => {
  return {
    id: Number(param.id),
    title: param.title,
    description: param.description,
    resourceURI: param.resourceURI,
    type: param.type,
    modified: param.modified,
    thumbnail: param.thumbnail,
    comics: param.comics,
    series: param.series,
    events: param.events,
    characters: param.characters,
    creators: param.creators,
    originalissue: param.originalissue,
  };
};

class SearchCharactersStoryServices {
  async execute({
    charactersId,
    name,
    limit,
    offset,
  }: Request): Promise<Response> {
    const filtersArray = [];
    filtersArray.push(Filter("id", charactersId));
    filtersArray.push(FilterRegex("name", name));
    const filter = { $and: filtersArray };

    const charactersResult = await Characters.findOne(filter)
      .populate("stories")
      .limit(limit)
      .skip(offset);

    const results = charactersResult.stories.reduce((prev: any, curr: any) => {
      prev.push(ResponseCharactersStory(curr));
      return prev;
    }, []);

    return {
      offset,
      limit,
      total: charactersResult.stories.length,
      count: charactersResult.stories.length,
      results,
    };
  }
}

export default new SearchCharactersStoryServices();
