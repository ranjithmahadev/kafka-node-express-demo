const kafka = require('kafka-node'),
      Consumer = kafka.Consumer,
      client = new kafka.KafkaClient (),
      consumer = new Consumer (client,
          [{ topic: 'POSTS', offset: 0}],
          {
            autoCommit: false
          }
      );
      

consumer.on ("message", function(message) {
    console.log('receiving message'+JSON.stringify (message));
        
});

consumer.on('error', function (err) {
    console.log('Error:',err);
});
