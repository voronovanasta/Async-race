import { CarData, EngineData } from "./types";

const url = "http://127.0.0.1:3000";

export const getCars = async (page: number) => {
  const response = await fetch(`${url}/garage?_page=${page}&_limit=7`);
  const cars: CarData[] = await response.json();
  return cars;
};

export const getAllCars = async () => {
  const response = await fetch(`${url}/garage`);
  const cars: CarData[] = await response.json();
  return cars;
};

export const createCar = async (carData: CarData) => {
  const response = await fetch(`http://127.0.0.1:3000/garage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });
  const car: CarData = await response.json();
  return car;
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: "DELETE",
  });

  return response;
};

export const updateCar = async (carData: CarData, id: number) => {
  const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });
  const car: CarData = await response.json();
  return car;
};

export const setEngine = async (status: "started" | "stopped", id: number) => {
  const response = await fetch(
    `http://127.0.0.1:3000/engine/?id=${id}&status=${status}`,
    {
      method: "PATCH",
    },
  );
  const engine: EngineData = await response.json();
  return engine;
};
