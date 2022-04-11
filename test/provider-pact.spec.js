const { MessageProviderPact } = require("@pact-foundation/pact");
const { createNewUser } = require("../provider/index");
const path = require("path");

jest.setTimeout(60000);

describe("User provider tests", () => {
  const pact = new MessageProviderPact({
    messageProviders: {
      "new user": () => createNewUser(),
    },
    provider: "UserProvider",
    providerVersion: "1.0.0",
    pactBrokerUrl: "{YOUR_PACT_BROKER_URL}",
    pactBrokerToken: "{YOUR_PACT_BROKER_TOKEN}",
    publishVerificationResult: true,
  });

  describe("User Provider", () => {
    it("a request for new user", () => {
      return pact.verify();
    });
  });
});
