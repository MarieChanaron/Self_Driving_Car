export function getObstacleEvents() {
  const coinFlip: boolean = Math.random() > 0.5;
  return { 
    'ObstacleLeft': coinFlip, 
    'ObstacleRight': !coinFlip 
  };
}
