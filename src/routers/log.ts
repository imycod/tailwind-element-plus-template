export let routeTimes = {};
export const logTimeOnPage = (from, to) => {
  const fromPath = to.redirectedFrom?.path ?? from.path;
  if (to.path === fromPath) return;
  if (fromPath) {
    const entryTime = routeTimes[fromPath]?.entryTime;
    if (entryTime) {
      const exitTime = Date.now();
      const timeSpent = exitTime - entryTime;
      routeTimes[fromPath].exitTime = exitTime;
      routeTimes[fromPath].timeSpent = timeSpent;
    } else {
      const entryTime = Date.now();
      const _exitTime = entryTime;
      const timeSpent = _exitTime - entryTime;
      routeTimes[fromPath] = {
        entryTime,
        exitTime: _exitTime,
        timeSpent,
        error: false,
      };
    }
  }
  if (to.path) {
    const entryTime = Date.now();
    routeTimes[to.path] = { entryTime, prev: fromPath,next:to.path, error: false };
  }
};
