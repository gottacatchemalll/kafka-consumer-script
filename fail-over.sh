for((i=0;i<100;i++)); do
    id=$(( $(($i % 3)) + 1))
    host=kafka$id
    echo "killing $host"
    docker restart $host
    sleep 1
done
