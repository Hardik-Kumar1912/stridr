// src/app/api/route/featureCollection.js
export async function getFeatureCollection(pois) {
  if (!pois || !Array.isArray(pois) || pois.length === 0) {
    console.error("No points of interest provided:", pois);
    return {};
  }
  console.log("Points of interest:", pois);
  const features = pois.map((poi, index) => {
    if (!Array.isArray(poi) || poi.length !== 2) {
      throw new Error("Invalid POI coordinates");
    }
    return {
      type: "Feature",
      id: `poi_${index}`,
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [poi[0] - 0.01, poi[1] - 0.01],
            [poi[0] + 0.01, poi[1] - 0.01],
            [poi[0] + 0.01, poi[1] + 0.01],
            [poi[0] - 0.01, poi[1] + 0.01],
            [poi[0] - 0.01, poi[1] - 0.01],
          ],
        ],
      },
    };
  });
  const featureCollection = {
    type: "FeatureCollection",
    features: features,
  };
  console.log("Generated feature collection:", featureCollection);
  return featureCollection;
}

/*


Example output for a all POIs: , all pois have to be made into polygons and then stored into this feature array
  
{
  "type": "FeatureCollection",
  "features": [
  {
    "type": "Feature",
    "id": "poi",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            1.525,
            42.511
          ],
          [
            1.510,
            42.503
          ],
          [
            1.531,
            42.495
          ],
          [
            1.542,
            42.505
          ],
          [
            1.525,
            42.511
          ]
        ]
      ]
    }
  },{
    "type": "Feature",
    "id": "poi",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            1.530,
            42.510
          ],
          [
            1.515,
            42.502
          ],
          [
            1.536,
            42.494
          ],
          [
            1.547,
            42.504
          ],
          [
            1.530,
            42.510
          ]
        ]
      ]
    }
    ]
}

*/
