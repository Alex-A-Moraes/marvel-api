import { connect, connection } from "mongoose";
import SearchCharactersStoryService from "./SearchCharactersStoryServices";

describe("Search Characters Story", () => {
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

  it("should be return characters story", async () => {
    const charactersResponse = await SearchCharactersStoryService.execute({
      charactersId: null,
      name: null,
      offset: 0,
      limit: 20,
    });

    expect(charactersResponse).toEqual(
      expect.objectContaining({
        results: expect.arrayContaining([
          expect.objectContaining({
            id: 19947,
          }),
        ]),
      })
    );
  });
});
