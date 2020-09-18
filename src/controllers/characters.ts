import { Request, Response } from 'express';
import * as httpStatus from 'http-status';
import Characters from '../models/characters';
import * as util from '../util/lib';

export default class CharactersController {
    static find = async (req: Request, res: Response) => {
        const {
            name = null,
            comics = null,
            series = null,
            events = null,
            stories = null,
            charactersId = null,
        } = {
            ...req.params,
            ...req.query,
        };

        const filtersArray = [];
        filtersArray.push(util.filter('id', charactersId));
        filtersArray.push(util.filterRegex('name', name));
        filtersArray.push(util.filterRegex('comics.items.resourceURI', comics));
        filtersArray.push(util.filterRegex('series.items.resourceURI', series));
        filtersArray.push(util.filterRegex('events.items.resourceURI', events));
        filtersArray.push(util.filterRegex('stories.items.resourceURI', stories));
        const filter = { $and: filtersArray };

        const charactersResult = await Characters.find(filter);
        return res.status(httpStatus.OK).json(charactersResult);
    };
}
