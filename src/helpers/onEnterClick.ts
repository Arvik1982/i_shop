
export const onKeyEnterDown = <T extends HTMLElement>(
    e: React.KeyboardEvent<T>,
    func: void|Function
  ) => {
    if (e.key === "Enter") {
      func;
    }
  };