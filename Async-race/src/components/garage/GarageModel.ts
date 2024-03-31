import { createCar, getAllCars, getCars } from "../../api";
import CarData from "../../types";
import GarageView from "./GarageView";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const models = [
  "BMW",
  "Volvo",
  "Skoda",
  "Volkswagen",
  "Toyota",
  "Renault",
  "Peugeot",
  "Opel",
  "KIA",
  "Ford",
];

function getRandomModel() {
  const randomNumber = Math.floor(Math.random() * (models.length - 1));
  return models[randomNumber];
}

export default class GarageModel {
  totalCarCount: number;

  cars: CarData[];

  garageView: GarageView;

  page: number;

  carData: CarData;

  newCar: CarData;

  constructor(garageView: GarageView) {
    this.cars = [];
    this.garageView = garageView;
    this.page = 1;
    this.carData = { name: "", color: " " };
    this.newCar = { name: "", color: " " };
    this.totalCarCount = 4;
  }

  async updateTotalCarsCount() {
    this.totalCarCount = (await getAllCars()).length;
    console.log(this.totalCarCount);
  }

  async createHundredCars() {
    const arrCars = [];
    let i = 0;
    while (i !== 100) {
      const name = getRandomModel();
      const color = getRandomColor();
      // await createCar({ name, color });
      const carData = { name, color };
      const car = fetch(`http://127.0.0.1:3000/garage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });
      arrCars.push(car);
      console.log(arrCars.length);
      i += 1;
    }

    Promise.all(arrCars);
    this.updateTotalCarsCount();
  }

  async drawGarage() {
    this.cars = await getCars(this.page);
    // this.garageView.drawGarage(this.cars);
  }

  async createCar() {
    this.newCar = await createCar(this.carData);
    // this.garageView.drawCar(this.newCar);
  }
}
