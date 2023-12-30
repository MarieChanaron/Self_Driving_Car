import { getObstacleEvents } from './computer-vision';

// Steering control

interface Control {
  execute: (command: string) => void;
}

interface Steering extends Control {
  turn: (direction: string) => void;
}

class SteeringControl implements Steering {

  execute(command: string) {
    console.log(`Executing: ${command}`);
  }

  turn(direction: string) {
    this.execute(`turn ${direction}`);
  }
}


// Car

interface Events {
  [obstacle: string]: boolean;
}

interface AutonomousCar {
  isRunning?: boolean;
  respond: (events: Events) => void; 
}

interface AutonomousCarProps {
  isRunning?: boolean;
  steeringControl: Steering;
}

class Car implements AutonomousCar {
  isRunning?: boolean;
  steeringControl: Steering;

  constructor(props: AutonomousCarProps) {
    this.isRunning = props.isRunning;
    this.steeringControl = props.steeringControl;
  }

  respond(events: Events) {
    if (!this.isRunning) {
      console.log("The car is off");
      return;
    }
    const eventKeys = Object.keys(events);
    eventKeys.forEach(eventKey => {
      if (!eventKey) return;
      if (eventKey === 'ObstacleLeft' && events[eventKey]) {
        this.steeringControl.turn('right');
      } else if (eventKey === 'ObstacleRight' && events[eventKey]) {
        this.steeringControl.turn('left');
      }
    });
  }
}


// Main
const steering = new SteeringControl();
const autonomousCar = new Car({
  isRunning: true, 
  steeringControl: steering
});
autonomousCar.respond(getObstacleEvents());
