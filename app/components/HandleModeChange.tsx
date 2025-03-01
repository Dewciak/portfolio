function animateNumbers(target: number[], current: number[], callback: (values: number[]) => void): void {
  const steps: number = 60;
  const increments: number[] = target.map((value, i) => (value - current[i]) / steps);

  let count: number = 0;

  const step = (): void => {
    if (count >= steps) {
      callback(target);
      return;
    }
    current = current.map((val, i) => val + increments[i]);
    callback([...current]);
    count++;
    requestAnimationFrame(step);
  };

  step();
  // Function to animate the numbers in the array from current to target values
}

interface handleModeChangeProps {
  gameMode: boolean;
  roomPosition: number[];
  roomRotation: number[];
  setRoomPosition: (values: number[]) => void;
  setRoomRotation: (values: number[]) => void;
  setGameRoom: (value: boolean) => void;
  gear?: boolean;
}

export default function handleModeChange({
  setGameRoom,
  gameMode,
  roomPosition,
  roomRotation,
  setRoomPosition,
  setRoomRotation,
  gear,
}: handleModeChangeProps): void {
  if (gameMode) {
    if (!gear) {
      // Hero
      animateNumbers([5, 0, 4], roomPosition, setRoomPosition);
      animateNumbers([0, 4.8, 0], roomRotation, setRoomRotation);
    } else {
      // Gear
      animateNumbers([5, -3, 3], roomPosition, setRoomPosition);
      animateNumbers([0, 4.7, 0], roomRotation, setRoomRotation);
    }
    setGameRoom(true);
  } else {
    if (gear) {
      // Gear
      animateNumbers([-1.3, 0, 0], roomPosition, setRoomPosition);
      animateNumbers([0, 0.7, 0], roomRotation, setRoomRotation);
    } else {
      // Hero
      animateNumbers([0, 0, 0], roomPosition, setRoomPosition);
      animateNumbers([0, 0, 0], roomRotation, setRoomRotation);
    }
    setGameRoom(false);
  }
}
