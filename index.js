const { publishMessage } = require("./provider");
const { receiveMessage } = require("./consumer");

publishMessage();

setInterval(() => {
  receiveMessage();
}, 1000);
