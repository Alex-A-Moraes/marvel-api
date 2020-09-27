import Characters, { CharactersDocument } from "../mongoose/schemas/character";
import "../mongoose/schemas/storie";
import "../mongoose/schemas/comic";
import "../mongoose/schemas/serie";
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
  results: CharactersDocument[];
}

const ResponseCharacters = (param: any) => {
  return {
    id: Number(param.id),
    name: param.name,
    description: param.description,
    modified: param.modified,
    thumbnail: param.thumbnail,
    resourceURI: param.resourceURI,
    comics: {
      available: Number(param.comics.length),
      collectionURI: `http://gateway.marvel.com/v1/public/characters/${param.id}/comics`,
      items: summaryListSimple(param.comics),
      returned: Number(param.comics.length),
    },
    series: {
      available: Number(param.series.length),
      collectionURI: `http://gateway.marvel.com/v1/public/characters/${param.id}/series`,
      items: summaryListSimple(param.series),
      returned: Number(param.series.length),
    },
    stories: {
      available: Number(param.stories.length),
      collectionURI: `http://gateway.marvel.com/v1/public/characters/${param.id}/stories`,
      items: summaryList(param.stories),
      returned: Number(param.stories.length),
    },
    events: {
      available: Number(param.events.length),
      collectionURI: `http://gateway.marvel.com/v1/public/characters/${param.id}/events`,
      items: summaryListSimple(param.events),
      returned: Number(param.events.length),
    },
    urls: param.urls,
  };
};

const summaryList = (param: string[]) => {
  return param.map((i: any) => {
    return {
      resourceURI: i.resourceURI,
      name: i.title,
      type: i.type,
    };
  });
};

const summaryListSimple = (param: string[]) => {
  return param.map((i: any) => {
    return {
      resourceURI: i.resourceURI,
      name: i.title,
    };
  });
};

class SearchCharactersService {
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

    const charactersResult = await Characters.find(filter)
      .populate("comics")
      .populate("stories")
      .populate("events")
      .populate("series")
      .limit(limit)
      .skip(offset);

    const results = charactersResult.reduce((prev: any, curr: any) => {
      prev.push(ResponseCharacters(curr));
      return prev;
    }, []);

    return {
      offset,
      limit,
      total: charactersResult.length,
      count: charactersResult.length,
      results,
    };
  }
}

export default new SearchCharactersService();
