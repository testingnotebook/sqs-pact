const { Publisher } = require("@pact-foundation/pact");
const path = require("path");
const childProcess = require("child_process");

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), "pacts/")],
  pactBroker: "{YOUR_PACT_BROKER_URL",
  pactBrokerToken: "{YOUR_PACT_BROKER_TOKEN}",
  consumerVersion: "1",
};

new Publisher(opts)
  .publishPacts()
  .then(() => {
    console.log("Pact contract publishing complete!");
  })
  .catch((e) => {
    console.log("Pact contract publishing failed: ", e);
  });
