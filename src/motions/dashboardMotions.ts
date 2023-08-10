type motionEntriesType = number | undefined;

export const small_box_motion = (
  duration: motionEntriesType,
  delay: motionEntriesType
) => {
  return {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        type: "tween",
      },
    },
  };
};
