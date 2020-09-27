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

  it("should be return all characters", async () => {
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

    expect(charactersResponse).toEqual(
      expect.objectContaining({
        results: expect.arrayContaining([
          expect.objectContaining({
            name: "3-D Man",
          }),
        ]),
      })
    );
  });

  it("should be return characters by id (1011334)", async () => {
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

    expect(charactersResponse.results.length).toBe(1);
    expect(charactersResponse.results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1011334,
        }),
      ])
    );
  });

  it("should be return all characters by param comicsId", async () => {
    const charactersResponse = await SearchCharactersService.execute({
      charactersId: null,
      stories: null,
      events: null,
      series: null,
      comics: "21366",
      name: null,
      offset: 0,
      limit: 20,
    });

    expect(charactersResponse).toEqual(
      expect.objectContaining({
        results: expect.arrayContaining([
          expect.objectContaining({
            name: "3-D Man",
          }),
        ]),
      })
    );
  });

  it("should be return all characters by param seriesId", async () => {
    const charactersResponse = await SearchCharactersService.execute({
      charactersId: null,
      stories: null,
      events: null,
      series: "3374",
      comics: null,
      name: null,
      offset: 0,
      limit: 20,
    });

    expect(charactersResponse).toEqual(
      expect.objectContaining({
        results: expect.arrayContaining([
          expect.objectContaining({
            name: "A-Bomb (HAS)",
          }),
        ]),
      })
    );
  });

  it("should be return all characters by param storiesId", async () => {
    const charactersResponse = await SearchCharactersService.execute({
      charactersId: null,
      stories: "92078",
      events: null,
      series: null,
      comics: null,
      name: null,
      offset: 0,
      limit: 20,
    });

    expect(charactersResponse).toEqual(
      expect.objectContaining({
        results: expect.arrayContaining([
          expect.objectContaining({
            name: "A-Bomb (HAS)",
          }),
        ]),
      })
    );
  });

  it("should be return all characters by param eventsId", async () => {
    const charactersResponse = await SearchCharactersService.execute({
      charactersId: null,
      stories: null,
      events: "269",
      series: null,
      comics: null,
      name: null,
      offset: 0,
      limit: 20,
    });

    expect(charactersResponse).toEqual(
      expect.objectContaining({
        results: expect.arrayContaining([
          expect.objectContaining({
            name: "3-D Man",
          }),
        ]),
      })
    );
  });
});
