import Characters, { CharactersDocument } from "../mongoose/schemas/character";
import "../mongoose/schemas/comic";
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

class SearchCharactersComicsServices {
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
      .populate("comics")
      .limit(limit)
      .skip(offset);

    return {
      offset,
      limit,
      total: charactersResult.comics.length,
      count: charactersResult.comics.length,
      results: charactersResult.comics,
    };
  }
}

export default new SearchCharactersComicsServices();
