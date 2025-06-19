#!/bin/bash
echo "Starting GraphHopper..."
exec ./graphhopper.sh --input /data/northern-zone-latest.osm.pbf --config /data/config.yml --host 0.0.0.0