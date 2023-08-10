export const box_motions = (duration: number, delay: number) => {
  return {
    hidden: {
      x: "-100vw",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      trnasition: {
        duration: duration,
        delay: delay,
        type: "tween",
      },
    },
    exit: {
      x: "+100vw",
      opacity: 0,
      transition: {
        duration: 0.1,
        delay: delay,
        type: "tween",
      },
    },
  };
};
