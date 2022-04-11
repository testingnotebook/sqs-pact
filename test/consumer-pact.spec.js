const {
  Matchers,
  MessageConsumerPact,
  synchronousBodyHandler,
} = require("@pact-foundation/pact");
const { handleMessage } = require("../consumer/index");
const path = require("path");
const { like } = Matchers;

describe("new user message ", () => {
  const messagePact = new MessageConsumerPact({
    consumer: "UserConsumer",
    dir: path.resolve(process.cwd(), "pacts"),
    pactBrokerUrl: "{YOUR_PACT_BROKER_URL}",
    pactBrokerToken: "{YOUR_PACT_BROKER_TOKEN}",
    pactfileWriteMode: "update",
    provider: "UserProvider",
    logLevel: "info",
  });
  it("processes message without error", () => {
    return messagePact
      .given("new user")
      .expectsToReceive("new user")
      .withContent({
        userName: like("clarlesLeclerc"),
        role: like("subscriber"),
      })
      .verify(synchronousBodyHandler(handleMessage));
  });
});
