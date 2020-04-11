// express imports
var express = require ('express');
var app = express ();
var bodyParser = require ('body-parser');

// kafka imports
var kafka = require('kafka-node');
var HighLevelProducer = kafka.HighLevelProducer;
const client = new kafka.KafkaClient ();
var producer = new HighLevelProducer(client);

// initial config
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded({
  extended: true
}))

// Create a new payload
const payload = [{ 
    topic: 'loggedin-user', 
    messages: {
      "userId": 1
    }, 
    partition: 0 ,
    attributes: 1 /* Use GZip compression for the payload */
}];

// port to listen
app.listen (3001, () => {
  console.log('kafka producer running at 3001 port');
});

app.get ('/', async (req, res) => {
  res.json ({
    'status': 200,
    'message': 'first route for kafka producer'
  })
})

producer.on('ready', function() {

  //Send payload to Kafka and log result/error
  producer.send(payload, function(error, result) {
    console.info('Sent payload to Kafka: ', payload);
    if (error) {
      console.error(error);
    } else {
      console.log('result: ', result)
    }
  });
});

app.post('/sendMsg',function(req,res){
  var sentMessage = JSON.stringify(req.body.message);
  const payloads = [
      { topic: req.body.topic, messages:sentMessage , partition: 0 }
  ];
  producer.send(payloads, function (err, data) {
    console.log('result'+JSON.stringify (data));
          res.json(data);
  });
  
})

// For this demo we just log producer errors to the console.
producer.on('error', function(error) {
  console.error(error);
});