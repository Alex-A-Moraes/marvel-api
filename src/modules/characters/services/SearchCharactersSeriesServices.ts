import Characters, { CharactersDocument } from "../mongoose/schemas/character";
import "../mongoose/schemas/serie";
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

const ResponseCharactersSeries = (param: any) => {
  return {
    id: Number(param.id),
    title: param.title,
    description: param.description,
    resourceURI: param.resourceURI,
    urls: param.urls,
    startYear: param.startYear,
    endYear: param.endYear,
    rating: param.rating,
    type: param.type,
    modified: param.modified,
    thumbnail: param.thumbnail,
    creators: param.creators,
    characters: param.characters,
    stories: param.stories,
    comics: param.comics,
    events: param.events,
    next: param.next,
    previous: param.previous,
  };
};

class SearchCharactersSeriesServices {
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
      .populate("series")
      .limit(limit)
      .skip(offset);

    const results = charactersResult.series.reduce((prev: any, curr: any) => {
      prev.push(ResponseCharactersSeries(curr));
      return prev;
    }, []);

    return {
      offset,
      limit,
      total: charactersResult.series.length,
      count: charactersResult.series.length,
      results,
    };
  }
}

export default new SearchCharactersSeriesServices();
