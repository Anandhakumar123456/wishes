import confetti from 'canvas-confetti';

// Golden luxury confetti burst for celebrations
export const triggerGoldConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#D4AF37', '#FCE7AC', '#AA771C']
  });

  fire(0.2, {
    spread: 60,
    colors: ['#4A0E17', '#800020', '#FCE4EC']
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#D4AF37', '#E5C158', '#FAF7F2']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#FFD700', '#FCE4EC']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#E5C158', '#4A0E17']
  });
};

// Gentle continuous petal drop effect
export const triggerPetalShower = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FCE4EC', '#F4C2C2', '#800020', '#D4AF37'],
      scalar: 1.2
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#FCE4EC', '#F4C2C2', '#800020', '#D4AF37'],
      scalar: 1.2
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};
