const activeAnimations = new WeakMap<(values: number[]) => void, number>();

function animateNumbers(target: number[], current: number[], callback: (values: number[]) => void): void {
  const duration = 700;
  const startValues = [...current];
  const startedAt = performance.now();
  const activeAnimation = activeAnimations.get(callback);

  if (activeAnimation) cancelAnimationFrame(activeAnimation);

  const step = (now: number): void => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const values = target.map((value, index) => startValues[index] + (value - startValues[index]) * progress);

    callback(values);

    if (progress < 1) {
      activeAnimations.set(callback, requestAnimationFrame(step));
    } else {
      activeAnimations.delete(callback);
    }
  };

  activeAnimations.set(callback, requestAnimationFrame(step));
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
