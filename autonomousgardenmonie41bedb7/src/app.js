/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_GARDENTABLE_NAME
	STORAGE_GARDENTABLE_ARN
	STORAGE_GARDENTABLE_STREAMARN
	data
Amplify Params - DO NOT EDIT */

const { PublishCommand } = require("@aws-sdk/client-sns");
const { snsClient } = require("./libs/snsClient.js");

const express = require("express");
// This will parser the boday in to jsen object
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/

app.get("/Notification", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

app.get("/Notification/*", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/

// this will send a reqquest from postman
app.post("/Notification", function (req, res) {
  // Add your code here
  // Set the parameters
  // Import required AWS SDK clients and commands for Node.js

  // Set the parameters
  // Create topic
  var params = {
    // This will interprate as a text not as a code
    // Wen postman send the req it will be us a josen
    // from the body we want to get the message
    Message: req.body.message, // MESSAGE_TEXT
    // Create topic awas and post it here
    TopicArn: "arn:aws:sns:us-west-2:057745697967:AlarmTopic", //TOPIC_ARN
  };

  const run = async () => {
    try {
      console.log(snsClient);
      const data = await snsClient.send(new PublishCommand(params));
      console.log("Success.", data);
      return data; // For unit tests.
    } catch (err) {
      console.log("Error", err.stack);
    }
  };
  run();

  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.post("/Notification/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/Notification", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/Notification/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/Notification", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/Notification/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
