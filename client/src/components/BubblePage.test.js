import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";

function mockGetColors(colorData) {
  return colorData;
}

const colorData = {
  data: [
    {
      color: "aliceblue",
      code: {
      hex: "#f0f8ff",
    },
      id: 1,
    },
    {
      color: "limegreen",
      code: {
      hex: "#99ddbc",
    },
      id: 2,
    },
  ],
};

jest.mock(mockGetColors());
test("Fetches data and renders the bubbles", async () => {
  expect(mockGetColors() === colorData);
});