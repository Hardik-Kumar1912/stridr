FROM israelhikingmap/graphhopper

# Optionally pre-baked graph files (if available)
COPY default-gh/ /data/default-gh/ 
COPY config.yml /data/config.yml
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]