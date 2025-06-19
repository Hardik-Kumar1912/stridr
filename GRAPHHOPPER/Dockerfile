FROM israelhikingmap/graphhopper

COPY default-gh/ /data/default-gh/
COPY config.yml /data/config.yml
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV JAVA_OPTS="-Xms2g -Xmx6g"

ENTRYPOINT ["/entrypoint.sh"]