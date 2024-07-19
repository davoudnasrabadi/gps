export function calcEventLocation(eventPassedTime, gpsArr) {
  const emptyResult = { gps: [], speed: 0 };

  if (!gpsArr || gpsArr.length < 2) return emptyResult;

  let closestBeforeEvent = null;
  let closestAfterEvent = null;

  for (let i = 0; i < gpsArr.length - 1; i++) {
    const current = gpsArr[i];
    const next = gpsArr[i + 1];

    if (current.time <= eventPassedTime && next.time >= eventPassedTime) {
      closestBeforeEvent = current;
      closestAfterEvent = next;
      break;
    }
  }

  if (!closestBeforeEvent || !closestAfterEvent) return emptyResult;

  const timeDiff1 = eventPassedTime - closestBeforeEvent.time;
  const timeDiff2 = closestAfterEvent.time - eventPassedTime;

  const calcAvgLoc = (cor1: number, cor2: number): number =>
    (cor1 * timeDiff2 + cor2 * timeDiff1) / (timeDiff1 + timeDiff2);

  const speed = (closestBeforeEvent.speed + closestAfterEvent.speed) / 2;
  const log = calcAvgLoc(
    closestBeforeEvent.coordinates[0],
    closestAfterEvent.coordinates[0],
  );
  const lat = calcAvgLoc(
    closestBeforeEvent.coordinates[1],
    closestAfterEvent.coordinates[1],
  );

  return { gps: [log, lat], speed };
}
