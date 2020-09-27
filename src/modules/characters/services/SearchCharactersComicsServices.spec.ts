import { connect, connection } from "mongoose";
import SearchCharactersComicsService from "./SearchCharactersComicsServices";

describe("Search Characters Comics", () => {
  beforeAll(async () => {
    await connect(`mongodb://localhost:27017/marvel`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should be return characters comics", async () => {
    const charactersResponse = await SearchCharactersComicsService.execute({
      charactersId: null,
      name: null,
      offset: 0,
      limit: 20,
    });

    expect(charactersResponse).toEqual(
      expect.objectContaining({
        results: expect.arrayContaining([
          expect.objectContaining({
            id: 21366,
          }),
        ]),
      })
    );
  });
});
