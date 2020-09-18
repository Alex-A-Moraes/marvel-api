import App from "../src/app";
import request from "supertest";
import { connect, connection } from "mongoose";
import Characters from "../src/models/characters";

describe("Characters", () => {
  describe("Test API", () => {
    it("it should return all characters", async () => {
      const charactersResponse = await request(App.app).get(
        "/v1/public/characters"
      );
      expect(charactersResponse.body).toEqual(
        expect.arrayContaining([expect.objectContaining({ name: "3-D Man" })])
      );
      expect(charactersResponse.status).toBe(200);
    });

    it("it should return characters Abyss by name", async () => {
      const charactersResponse = await request(App.app).get(
        "/v1/public/characters?name=Abyss"
      );
      expect(charactersResponse.status).toBe(200);
      expect(charactersResponse.body).toEqual(
        expect.arrayContaining([expect.objectContaining({ name: "Abyss" })])
      );
    });

    it("it should return characters by ID (1010903) ", async () => {
      const charactersResponse = await request(App.app).get(
        "/v1/public/characters/1010903"
      );
      expect(charactersResponse.status).toBe(200);
      expect(charactersResponse.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: "Abyss (Age of Apocalypse)" }),
        ])
      );
    });

    it("it should return characters by ID (1010903) / comics ", async () => {
      const charactersResponse = await request(App.app).get(
        "/v1/public/characters/1010903/comics"
      );
      expect(charactersResponse.status).toBe(200);
      expect(charactersResponse.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "Avengers: The Initiative (2007) #19",
          }),
        ])
      );
    });

    it("it should return characters by ID (1010903) / events ", async () => {
      const charactersResponse = await request(App.app).get(
        "/v1/public/characters/1010903/events"
      );
      expect(charactersResponse.status).toBe(200);
      expect(charactersResponse.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "Secret Invasion",
          }),
        ])
      );
    });

    it("it should return characters by ID (1010903) / series ", async () => {
      const charactersResponse = await request(App.app).get(
        "/v1/public/characters/1010903/series"
      );
      expect(charactersResponse.status).toBe(200);
      expect(charactersResponse.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "Deadpool (1997 - 2002)",
          }),
        ])
      );
    });

    it("it should return characters by ID (1010903) / stories ", async () => {
      const charactersResponse = await request(App.app).get(
        "/v1/public/characters/1010903/stories"
      );
      expect(charactersResponse.status).toBe(200);
      expect(charactersResponse.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "Cover #19947",
          }),
        ])
      );
    });
  });
});
