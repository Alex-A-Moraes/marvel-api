import Characters, { CharactersDocument } from "../mongoose/schemas/character";
import "../mongoose/schemas/event";
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

const ResponseCharactersEvents = (param: any) => {
  return {
    id: Number(param.id),
    title: param.title,
    description: param.description,
    resourceURI: param.resourceURI,
    urls: param.urls,
    modified: param.modified,
    start: param.start,
    end: param.end,
    thumbnail: param.thumbnail,
    creators: param.creators,
    characters: param.characters,
    stories: param.stories,
    comics: param.comics,
    series: param.series,
    next: param.next,
    previous: param.previous,
  };
};

class SearchCharactersEventsServices {
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
      .populate("events")
      .limit(limit)
      .skip(offset);

    const results = charactersResult.events.reduce((prev: any, curr: any) => {
      prev.push(ResponseCharactersEvents(curr));
      return prev;
    }, []);

    return {
      offset,
      limit,
      total: charactersResult.events.length,
      count: charactersResult.events.length,
      results,
    };
  }
}

export default new SearchCharactersEventsServices();
