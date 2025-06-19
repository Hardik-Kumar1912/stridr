FROM israelhikingmap/graphhopper

# Copy parsed {}.osm.pbf files 
# [edgekv_keys, edgekv_vals, edges, geometry, location_index, nodes, nodes_ch_foot, properties, properties.txt, shortcuts_foot]
COPY default-gh/ /data/default-gh/ 

COPY config.yml /data/config.yml
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# ENV JAVA_OPTS="-Xms2g -Xmx6g"

ENTRYPOINT ["/entrypoint.sh"]