import { connect, connection } from "mongoose";
import Story from "../mongoose/schemas/storie";
import Characters from "../mongoose/schemas/character";
import Comic, { ComicDocument } from "../mongoose/schemas/comic";
import Event from "../mongoose/schemas/event";
import Serie from "../mongoose/schemas/serie";

describe("DB CRUD", () => {
  it("it should be ok", () => {
    const response = "ok";

    expect(response).toEqual("ok");
  });

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

  it("it should insert characters", async () => {
    const comics = await Comic.find();
    const comicsIds = comics.map((c) => c._id);

    const series = await Serie.find();
    const seriesIds = series.map((c) => c._id);

    const stories = await Story.find();
    const storiesIds = stories.map((c) => c._id);

    const events = await Event.find();
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

    const characters = await Characters.find()
      .populate("comics")
      .populate("stories")
      .populate("events")
      .populate("series");

    console.log(characters);

    expect(characters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 21366 }),
        expect.objectContaining({ id: 269 }),
      ])
    );
  });
});
