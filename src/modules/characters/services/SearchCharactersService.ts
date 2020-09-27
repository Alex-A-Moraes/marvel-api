import Characters, { CharactersDocument } from "../mongoose/schemas/character";
import Comic from "../mongoose/schemas/comic";
import Story from "../mongoose/schemas/storie";
import Event from "../mongoose/schemas/event";
import Serie from "../mongoose/schemas/serie";
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

    if (comics) {
      const comicsDto = await Comic.findOne({ id: Number(comics) });
      filtersArray.push(Filter("comics", comicsDto._id));
    }
    if (series) {
      const seriesDto = await Serie.findOne({ id: Number(series) });
      filtersArray.push(Filter("series", seriesDto._id));
    }
    if (events) {
      const eventsDto = await Event.findOne({ id: Number(events) });
      filtersArray.push(Filter("events", eventsDto._id));
    }
    if (stories) {
      const storiesDto = await Story.findOne({ id: Number(stories) });
      filtersArray.push(Filter("stories", storiesDto._id));
    }

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
