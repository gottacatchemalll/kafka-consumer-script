docker run --network=host -it confluentinc/cp-kafka:5.4.2 kafka-topics --bootstrap-server localhost:9092,localhost:9095,localhost:9098 --describe --topic test_topic
