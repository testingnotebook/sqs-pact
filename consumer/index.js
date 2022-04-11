var AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

var queueURL = "{YOUR_SQS_QUEUE_URL}";

const handleMessage = ({ userName, role }) => {
  if (userName == null || role == null)
    throw new Error("Missing user information");
};

var params = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ["All"],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

const receiveMessage = () => {
  sqs.receiveMessage(params, function (err, data) {
    if (err) {
      console.log("Receive Error", err);
    } else if (data.Messages) {
      handleMessage(JSON.parse(data.Messages[0].Body));
      var deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };
      sqs.deleteMessage(deleteParams, function (err, data) {
        if (err) {
          console.log("Delete Error", err);
        } else {
          console.log("Message Deleted", data);
        }
      });
    }
  });
};

module.exports = { handleMessage, receiveMessage };
