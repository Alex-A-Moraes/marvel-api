import { connect, connection } from "mongoose";
import SearchCharactersEventsService from "./SearchCharactersEventsServices";

describe("Search Characters Events", () => {
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

  it("should be return characters event", async () => {
    const charactersResponse = await SearchCharactersEventsService.execute({
      charactersId: null,
      name: null,
      offset: 0,
      limit: 20,
    });

    expect(charactersResponse).toEqual(
      expect.objectContaining({
        results: expect.arrayContaining([
          expect.objectContaining({
            id: 269,
          }),
        ]),
      })
    );
  });
});
