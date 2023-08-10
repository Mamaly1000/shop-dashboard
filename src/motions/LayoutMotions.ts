type motionEntriesType = number | undefined;
export const sidebar_motion = (
  duration: motionEntriesType,
  delay: motionEntriesType,
  language: string
) => {
  return {
    hidden: {
      x: language === "fa" ? "100vw" : "-100vw",
      opacity: 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      left: language === "en" ? 0 : "unset",
      right: language === "fa" ? 0 : "unset",
      transition: {
        duration: duration,
        delay: delay,
        when: "beforeChildren",
        type: "tween",
      },
    },
    view: {
      opacity: 1,
      x: 0,
      transition: {
        duration: duration,
        delay: delay,
        when: "beforeChildren",
      },
    },
    hover: {},
    exit: {
      x: language === "fa" ? "100vw" : "-100vw",
      opacity: 0,
      transition: {
        duration: duration,
        delay: delay,
        when: "beforeChildren",
        type: "tween",
      },
    },
  };
};
export const view_from_bottom = (
  duration: motionEntriesType,
  delay: motionEntriesType
) => {
  return {
    hidden: {
      opacity: 0,
      y: 10,
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
    exit: {
      opacity: 0,
      transition: {
        duration: duration,
        type: "tween",
      },
    },
  };
};
