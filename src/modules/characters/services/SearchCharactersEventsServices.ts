import Characters, { CharactersDocument } from "../mongoose/schemas/character";
import "../mongoose/schemas/event";
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

class SearchCharactersEventsServices {
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
      .populate("events")
      .limit(limit)
      .skip(offset);

    return {
      offset,
      limit,
      total: charactersResult.events.length,
      count: charactersResult.events.length,
      results: charactersResult.events,
    };
  }
}

export default new SearchCharactersEventsServices();
