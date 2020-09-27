import { Router } from "express";
import CharactersController from "../controllers/characters";

const charactersRouter = Router();

charactersRouter.get("/", CharactersController.getCharacters);
charactersRouter.get("/:charactersId", CharactersController.getCharacters);
charactersRouter.get(
  "/:charactersId/comics",
  CharactersController.getCharactersComics
);
charactersRouter.get(
  "/:charactersId/events",
  CharactersController.getCharactersEvents
);
charactersRouter.get(
  "/:charactersId/series",
  CharactersController.getCharactersSeries
);
charactersRouter.get(
  "/:charactersId/stories",
  CharactersController.getCharactersStories
);

export default charactersRouter;
