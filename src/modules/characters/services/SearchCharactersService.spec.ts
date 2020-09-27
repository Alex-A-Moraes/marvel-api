import { connect, connection } from "mongoose";
import SearchCharactersService from "./SearchCharactersService";

describe("Search Characters", () => {
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

  it("should be return characters", async () => {
    const charactersResponse = await SearchCharactersService.execute({
      charactersId: null,
      stories: null,
      events: null,
      series: null,
      comics: null,
      name: null,
      offset: 0,
      limit: 20,
    });

    expect(charactersResponse.data.results.length).toBe(1);
    expect(charactersResponse.data.results).toEqual([
      expect.objectContaining({
        name: "3-D Man",
      }),
    ]);
  });

  it("should be return characters by charactersId = 1011334", async () => {
    const charactersResponse = await SearchCharactersService.execute({
      charactersId: 1011334,
      stories: null,
      events: null,
      series: null,
      comics: null,
      name: null,
      offset: 0,
      limit: 20,
    });

    expect(charactersResponse.data.results).toEqual(
      expect.objectContaining({
        name: "3-D Man",
      })
    );
  });
});
