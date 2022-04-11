var AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-2" });

var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const createNewUser = () => {
  return {
    userId: 100,
    userName: "admin",
    role: "superadmin",
  };
};

const publishMessage = () => {
  var params = {
    DelaySeconds: 10,
    MessageBody: JSON.stringify(createNewUser()),
    QueueUrl: "{YOUR_SQS_QUEUE_URL}",
  };

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
    }
  });
};

module.exports = { createNewUser, publishMessage };
