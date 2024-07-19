export function formatGpsData(gpsData) {
  return gpsData.map((el) => ({
    time: Number(el[0]),
    type: 'point',
    coordinates: [Number(el[1][1]), Number(el[1][0])],
    speed: Number(el[1][2]) || 0,
  }));
}
