import Characters, { CharactersDocument } from "../mongoose/schemas/character";
import "../mongoose/schemas/storie";
import { Filter, FilterRegex } from "../../../util";

interface Request {
  charactersId?: number;
  name?: string;
  comics?: string;
  series?: string;
  events?: string;
  stories?: string;
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

class SearchCharactersStoryServices {
  async execute({
    charactersId,
    name,
    comics,
    series,
    events,
    stories,
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

    return {
      offset,
      limit,
      total: charactersResult.stories.length,
      count: charactersResult.stories.length,
      results: charactersResult.stories,
    };
  }
}

export default new SearchCharactersStoryServices();
