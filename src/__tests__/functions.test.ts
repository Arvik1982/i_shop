import {
  handleImgChange,
  productDiscounted,
  quantityReturn,
} from "../helpers/helpers";
import { imgOnLoad } from "../helpers/onImgLoad";
import { TProduct } from "../types/commonTypes";

type TProductTest = {
  discountPercentage: number;
  discountedTotal: number;
  id: number;
  price: number;
  quantity: number;
  thumbnail: string;
  title: string;
  total: number;
};

describe("FUNCTIONS_TESTS", () => {
  describe("productDiscounted", () => {
    test("should count a discount correctly", () => {
      expect(productDiscounted(100, 20)).toBe(80); // 20% от 100 = 80
      expect(productDiscounted(200, 50)).toBe(100); // 50% от 200 = 100
      expect(productDiscounted(150, 25)).toBe(112.5); // 25% от 150 = 112.5
    });

    test("should return the original price if discount is 0", () => {
      expect(productDiscounted(100, 0)).toBe(100); // 0% от 100 = 100
    });

    test("should return 0 if price is 0", () => {
      expect(productDiscounted(0, 20)).toBe(0); // 20% от 0 = 0
    });

    test("should count negative discount values", () => {
      expect(productDiscounted(100, -10)).toBe(110); // -10% от 100 = 110
    });

    test("should count discount more 100%", () => {
      expect(productDiscounted(100, 150)).toBe(0); // 150% от 100 = -50,  до 0
    });
  });

  describe("handleImgChange", () => {
    test("should update image correctly", () => {
      const data = ["image1.jpg", "image2.jpg", "image3.jpg"];
      const index = 1;
      const mockSetFunc = jest.fn();
      handleImgChange(data, index, mockSetFunc);
      expect(mockSetFunc).toHaveBeenCalledWith("image2.jpg");
    });
  });

  describe("imgOnLoad", () => {
    test("should set loading for index", () => {
      const setLoadingStates = jest.fn();
      const initialStates = [true, true, true];
      imgOnLoad(1, setLoadingStates);
      expect(setLoadingStates).toHaveBeenCalledWith(expect.any(Function));
      const updateFunction = setLoadingStates.mock.calls[0][0];
      const newStates = updateFunction(initialStates);
      expect(newStates).toEqual([true, false, true]);
    });

    test("should not change indexes", () => {
      const setLoadingStates = jest.fn();
      const initialStates = [true, true, true];
      imgOnLoad(2, setLoadingStates);
      const updateFunction = setLoadingStates.mock.calls[0][0];
      const newStates = updateFunction(initialStates);
      expect(newStates).toEqual([true, true, false]);
    });
  });

  describe("quantityReturn", () => {
    test("should return the quantity if product exists", () => {
      const products: TProductTest[] = [
        {
          discountPercentage: 1,
          discountedTotal: 1,
          id: 1,
          price: 1,
          quantity: 5,
          thumbnail: "string;",
          title: "string;",
          total: 1,
        },
        {
          discountPercentage: 1,
          discountedTotal: 1,
          id: 2,
          price: 1,
          quantity: 10,
          thumbnail: "string;",
          title: "string;",
          total: 1,
        },
        {
          discountPercentage: 1,
          discountedTotal: 1,
          id: 3,
          price: 1,
          quantity: 0,
          thumbnail: "string;",
          title: "string;",
          total: 1,
        },
      ];

      const result = quantityReturn(products, "2");
      expect(result).toBe(10);
    });

    test("should return 0 if the product does not exist", () => {
      const products: TProduct[] = [
        {
          discountPercentage: 1,
          discountedTotal: 1,
          id: 1,
          price: 1,
          quantity: 5,
          thumbnail: "string;",
          title: "string;",
          total: 1,
        },
        {
          discountPercentage: 1,
          discountedTotal: 1,
          id: 2,
          price: 1,
          quantity: 10,
          thumbnail: "string;",
          title: "string;",
          total: 1,
        },
      ];

      const result = quantityReturn(products, "3");
      expect(result).toBe(0);
    });

    test("should return 0 if the id is undefined", () => {
      const products: TProduct[] = [
        {
          discountPercentage: 1,
          discountedTotal: 1,
          id: 1,
          price: 1,
          quantity: 5,
          thumbnail: "string;",
          title: "string;",
          total: 1,
        },
        {
          discountPercentage: 1,
          discountedTotal: 1,
          id: 2,
          price: 1,
          quantity: 10,
          thumbnail: "string;",
          title: "string;",
          total: 1,
        },
      ];

      const result = quantityReturn(products, undefined);
      expect(result).toBe(0);
    });

    test("should return 0 if the id is not a number", () => {
      const products: TProduct[] = [
        {
          discountPercentage: 1,
          discountedTotal: 1,
          id: 1,
          price: 1,
          quantity: 5,
          thumbnail: "string;",
          title: "string;",
          total: 1,
        },
        {
          discountPercentage: 1,
          discountedTotal: 1,
          id: 2,
          price: 1,
          quantity: 10,
          thumbnail: "string;",
          title: "string;",
          total: 1,
        },
      ];

      const result = quantityReturn(products, "not-a-number");
      expect(result).toBe(0);
    });
  });
});
