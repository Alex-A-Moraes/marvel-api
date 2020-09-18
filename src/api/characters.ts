import { Router } from "express";
import CharactersController from "../controllers/characters";

const charactersRouter = Router();

charactersRouter.get("/", CharactersController.find);
charactersRouter.get("/:charactersId", CharactersController.find);
charactersRouter.get("/:charactersId/comics", CharactersController.find);
charactersRouter.get("/:charactersId/events", CharactersController.find);
charactersRouter.get("/:charactersId/series", CharactersController.find);
charactersRouter.get("/:charactersId/stories", CharactersController.find);

export default charactersRouter;
