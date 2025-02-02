function animateNumbers(
  target: number[],
  current: number[],
  duration: number = 1000,
  callback: (values: number[]) => void
): void {
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
      animateNumbers([5.5, 0, 4], roomPosition, 1000, setRoomPosition);
      animateNumbers([0, 4.8, 0], roomRotation, 1000, setRoomRotation);
    } else {
      animateNumbers([5, 0, 4], roomPosition, 1000, setRoomPosition);
      animateNumbers([0, 5, 0], roomRotation, 1000, setRoomRotation);
    }
    setGameRoom(true);
  } else {
    if (gear) {
      animateNumbers([-2, 0, 0], roomPosition, 1000, setRoomPosition);
      animateNumbers([0, 0, 0], roomRotation, 1000, setRoomRotation);
    } else {
      animateNumbers([3, 0, 0], roomPosition, 1000, setRoomPosition);
      animateNumbers([0, 0, 0], roomRotation, 1000, setRoomRotation);
    }
    setGameRoom(false);
  }
}
