export const productDiscounted = (price: number, discount: number) => {
    return Math.round((price - (price * discount) / 100) * 100) / 100;
  };