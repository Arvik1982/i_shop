export const imgOnLoad = (
  index: number,
  setLoadingStates: React.Dispatch<React.SetStateAction<boolean[]>>
) => {
  setLoadingStates((prev) => {
    const newStates = [...prev];
    newStates[index] = false;
    return newStates;
  });
};
PageTransitionEvent
export const imgOnError = (
  index: number,
  setLoadingStates: React.Dispatch<React.SetStateAction<boolean[]>>
) => {
  setLoadingStates((prev) => {
    const newStates = [...prev];
    newStates[index] = false;
    return newStates;
  });
};
