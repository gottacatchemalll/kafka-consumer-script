const {Kafka, Consumer, logLevel} = require('kafkajs');
const bootstrapBrokers = 'localhost:9092,localhost:9095,localhost:9098';
const retry = { initialRetryTime: 100, multiplier: 1.5, retries: Infinity, };
const kafka = new Kafka({
  clientId: 'node-consumer-1',
  brokers: bootstrapBrokers.split(','),
  logLevel: logLevel.INFO,
  retry,
});

const consumer = kafka.consumer({
  groupId: 'node-consumers',
  maxBytesPerPartition: 100000000,
  sessionTimeout: 300000,
  minBytes: 50000,
  maxWaitTimeInMs: 100,
  retry,
});


(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test_topic' });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        ts: new Date().toString(),
        value: message.value.toString(),
      })
    },
  });
})()
