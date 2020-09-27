import { connect, connection } from "mongoose";
import Story from "../mongoose/schemas/storie";
import Characters from "../mongoose/schemas/character";
import Comic from "../mongoose/schemas/comic";
import Event from "../mongoose/schemas/event";
import Serie from "../mongoose/schemas/serie";
import "../mongoose/schemas/storie";
import "../mongoose/schemas/comic";
import "../mongoose/schemas/serie";
import "../mongoose/schemas/event";

describe("Add Characters", () => {
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

  it("it should insert characters 1011334", async () => {
    const comics = await Comic.find({
      "characters.items.resourceURI": { $regex: /1011334$/ },
    });
    const comicsIds = comics.map((c) => c._id);

    const series = await Serie.find({
      "characters.items.resourceURI": { $regex: /1011334$/ },
    });
    const seriesIds = series.map((c) => c._id);

    const stories = await Story.find({
      "characters.items.resourceURI": { $regex: /1011334$/ },
    });
    const storiesIds = stories.map((c) => c._id);

    const events = await Event.find({
      "characters.items.resourceURI": { $regex: /1011334$/ },
    });
    const eventsIds = events.map((c) => c._id);

    await Characters.create({
      id: "1011334",
      name: "3-D Man",
      description: "",
      modified: "2014-04-29T14:18:17-0400",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
        extension: "jpg",
      },
      resourceURI: "http://gateway.marvel.com/v1/public/characters/1011334",
      comics: comicsIds,
      series: seriesIds,
      stories: storiesIds,
      events: eventsIds,
      urls: [
        {
          type: "detail",
          url:
            "http://marvel.com/comics/characters/1011334/3-d_man?utm_campaign=apiRef&utm_source=20dff8ea94819166f73451e4f740fe96",
        },
        {
          type: "wiki",
          url:
            "http://marvel.com/universe/3-D_Man_(Chandler)?utm_campaign=apiRef&utm_source=20dff8ea94819166f73451e4f740fe96",
        },
        {
          type: "comiclink",
          url:
            "http://marvel.com/comics/characters/1011334/3-d_man?utm_campaign=apiRef&utm_source=20dff8ea94819166f73451e4f740fe96",
        },
      ],
    });

    const characters = await Characters.find({ id: "1011334" })
      .populate("comics")
      .populate("stories")
      .populate("events")
      .populate("series");

    expect(characters).toEqual(
      expect.objectContaining({
        comics: expect.arrayContaining([
          expect.objectContaining({
            id: 21366,
          }),
        ]),
        stories: expect.arrayContaining([
          expect.objectContaining({
            id: 19947,
          }),
        ]),
        events: expect.arrayContaining([
          expect.objectContaining({
            id: 1945,
          }),
        ]),
        series: expect.arrayContaining([
          expect.objectContaining({
            id: 269,
          }),
        ]),
      })
    );
  });

  it("it should insert characters 1017100", async () => {
    const comics = await Comic.find({
      "characters.items.resourceURI": { $regex: /1017100$/ },
    });
    const comicsIds = comics.map((c) => c._id);

    const series = await Serie.find({
      "characters.items.resourceURI": { $regex: /1017100$/ },
    });
    const seriesIds = series.map((c) => c._id);

    const stories = await Story.find({
      "characters.items.resourceURI": { $regex: /1017100$/ },
    });
    const storiesIds = stories.map((c) => c._id);

    const events = await Event.find({
      "characters.items.resourceURI": { $regex: /1017100$/ },
    });
    const eventsIds = events.map((c) => c._id);

    await Characters.create({
      id: "1017100",
      name: "A-Bomb (HAS)",
      description:
        "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
      modified: "2013-09-18T15:54:04-0400",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
        extension: "jpg",
      },
      resourceURI: "http://gateway.marvel.com/v1/public/characters/1017100",
      comics: comicsIds,
      series: seriesIds,
      stories: storiesIds,
      events: eventsIds,
      urls: [
        {
          type: "detail",
          url:
            "http://marvel.com/characters/76/a-bomb?utm_campaign=apiRef&utm_source=20dff8ea94819166f73451e4f740fe96",
        },
        {
          type: "comiclink",
          url:
            "http://marvel.com/comics/characters/1017100/a-bomb_has?utm_campaign=apiRef&utm_source=20dff8ea94819166f73451e4f740fe96",
        },
      ],
    });

    const characters = await Characters.find({ id: "1017100" })
      .populate("comics")
      .populate("stories")
      .populate("events")
      .populate("series");

    expect(characters).toEqual(
      expect.objectContaining({
        comics: expect.arrayContaining([
          expect.objectContaining({
            id: 40632,
          }),
        ]),
        stories: expect.arrayContaining([
          expect.objectContaining({
            id: 92079,
          }),
        ]),
        series: expect.arrayContaining([
          expect.objectContaining({
            id: 17765,
          }),
        ]),
      })
    );
  });
});
