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
  CharactersController.getCharacters
);
charactersRouter.get(
  "/:charactersId/series",
  CharactersController.getCharacters
);
charactersRouter.get(
  "/:charactersId/stories",
  CharactersController.getCharacters
);

export default charactersRouter;
