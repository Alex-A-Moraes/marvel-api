import Characters, { CharactersDocument } from "../mongoose/schemas/character";
import "../mongoose/schemas/comic";
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

const ResponseCharactersComics = (param: any) => {
  return {
    id: Number(param.id),
    digitalId: param.digitalId,
    title: param.title,
    issueNumber: param.issueNumber,
    variantDescription: param.variantDescription,
    description: param.description,
    modified: param.modified,
    isbn: param.isbn,
    upc: param.upc,
    diamondCode: param.diamondCode,
    ean: param.ean,
    issn: param.issn,
    format: param.format,
    pageCount: param.pageCount,
    textObjects: param.textObjects,
    resourceURI: param.resourceURI,
    urls: param.urls,
    series: param.series,
    variants: param.variants,
    collections: param.collections,
    collectedIssues: param.collectedIssues,
    dates: param.dates,
    prices: param.prices,
    thumbnail: param.thumbnail,
    images: param.images,
    creators: param.creators,
    characters: param.characters,
    stories: param.stories,
    events: param.events,
  };
};

class SearchCharactersComicsServices {
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
      .populate("comics")
      .limit(limit)
      .skip(offset);

    const results = charactersResult.comics.reduce((prev: any, curr: any) => {
      prev.push(ResponseCharactersComics(curr));
      return prev;
    }, []);

    return {
      offset,
      limit,
      total: charactersResult.comics.length,
      count: charactersResult.comics.length,
      results,
    };
  }
}

export default new SearchCharactersComicsServices();
