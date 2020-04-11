# kafka-node-express-demo
Demo on kafka-node producer and consumer using express

# To start a ZooKeeper
bin/zookeeper-server-start.sh config/zookeeper.properties

# To run kafka
bin/kafka-server-start.sh config/server.properties

# To run producer and consumer
node ./producer.js
node ./consumer.js
