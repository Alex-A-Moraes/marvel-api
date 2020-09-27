import { Request, Response } from "express";
import httpStatus from "http-status";
import SearchCharactersService from "../services/SearchCharactersService";
import { SendResponse } from "../../../util";
import SearchCharactersComicsServices from "../services/SearchCharactersComicsServices";
import SearchCharactersEventsServices from "../services/SearchCharactersEventsServices";
import SearchCharactersSeriesServices from "../services/SearchCharactersSeriesServices";
import SearchCharactersStoryServices from "../services/SearchCharactersStoryServices";

export default class CharactersController {
  static getCharacters = async (req: Request, res: Response) => {
    try {
      const {
        charactersId = null,
        offset = 0,
        limit = 20,
        stories = null,
        events = null,
        series = null,
        comics = null,
        name = null,
      } = { ...req.query, ...req.params };

      const data = await SearchCharactersService.execute({
        charactersId,
        stories,
        events,
        series,
        comics,
        name,
        offset,
        limit,
      });

      SendResponse(res, httpStatus.OK, data);
    } catch (error) {
      SendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  };

  static getCharactersComics = async (req: Request, res: Response) => {
    try {
      const { charactersId = null, offset = 0, limit = 20, name = null } = {
        ...req.query,
        ...req.params,
      };

      const data = await SearchCharactersComicsServices.execute({
        charactersId,
        name,
        offset,
        limit,
      });

      SendResponse(res, httpStatus.OK, data);
    } catch (error) {
      SendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  };

  static getCharactersEvents = async (req: Request, res: Response) => {
    try {
      const { charactersId = null, offset = 0, limit = 20, name = null } = {
        ...req.query,
        ...req.params,
      };

      const data = await SearchCharactersEventsServices.execute({
        charactersId,
        name,
        offset,
        limit,
      });

      SendResponse(res, httpStatus.OK, data);
    } catch (error) {
      SendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  };

  static getCharactersSeries = async (req: Request, res: Response) => {
    try {
      const { charactersId = null, offset = 0, limit = 20, name = null } = {
        ...req.query,
        ...req.params,
      };

      const data = await SearchCharactersSeriesServices.execute({
        charactersId,
        name,
        offset,
        limit,
      });

      SendResponse(res, httpStatus.OK, data);
    } catch (error) {
      SendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  };

  static getCharactersStories = async (req: Request, res: Response) => {
    try {
      const { charactersId = null, offset = 0, limit = 20, name = null } = {
        ...req.query,
        ...req.params,
      };

      const data = await SearchCharactersStoryServices.execute({
        charactersId,
        name,
        offset,
        limit,
      });

      SendResponse(res, httpStatus.OK, data);
    } catch (error) {
      SendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  };
}
