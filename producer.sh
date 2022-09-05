id=$(LC_CTYPE=C tr -dc A-Za-z0-9 < /dev/urandom | fold -w ${1:-32} | head -n 1)
for((i=0;i<1000;i++))
do
    echo "$id $i" | kafkacat -P -b localhost:9092,localhost:9095,localhost:9098 -t test_topic
    echo "produced $i"
    sleep 2
done
