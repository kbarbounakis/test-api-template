import { app, serve, getServerAddress } from "@themost/test";
import fetch from "node-fetch";
describe("TestApi", () => {
  let server;
  let server_uri;
  beforeAll(done => {
    serve(app)
      .then(liveServer => {
        server = liveServer;
        server_uri = getServerAddress(server);
        return done();
      })
      .catch(err => {
        return done(err);
      });
  });
  afterAll(done => {
    if (server) {
      server.close(() => {
        return done();
      });
    }
  });
  it("should access server", async () => {
    expect(server).toBeTruthy();
    const response = await fetch(new URL("/", server_uri));
    expect(response.ok).toBeTruthy();
  });
});
