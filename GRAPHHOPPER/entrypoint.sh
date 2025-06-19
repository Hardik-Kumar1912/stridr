#!/bin/bash
set -e  # Exit on error

GH_DATA_DIR="/data/default-gh"
OSM_PBF="/data/northern-zone-latest.osm.pbf"
CONFIG="/data/config.yml"

# Check if default-gh already exists (i.e., pre-parsed)
if [ -d "$GH_DATA_DIR" ] && [ -f "$GH_DATA_DIR/edges" ]; then
  echo "default-gh directory already exists. Skipping import..."
else
  echo "default-gh directory not found. Importing from OSM PBF..."

  # OPTIONAL: download if .osm.pbf file doesn't exist
  if [ ! -f "$OSM_PBF" ]; then
    echo "$OSM_PBF not found. Downloading..."
    curl -o "$OSM_PBF" https://download.geofabrik.de/asia/india/northern-zone-latest.osm.pbf
  fi

  # Run the import step
  ./graphhopper.sh import "$OSM_PBF" --config "$CONFIG"
fi

# Start the GraphHopper server
exec ./graphhopper.sh web --config "$CONFIG" --host 0.0.0.0