import { createCar, getAllCars, getCars, updateCar } from "../../api";
import { CarData } from "../../types";// eslint-disable-line
import currentCarsOnPage from "../../utils/currentCars";
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

  nameInput: string;

  colorInput: string;

  updateNameInput: string;

  updateColorInput: string;

  selectedCarId: string;

  constructor(garageView: GarageView) {
    this.cars = [];
    this.garageView = garageView;
    this.page = 1;
    this.carData = { name: "", color: " " };
    this.newCar = { name: "", color: " " };
    this.totalCarCount = 0;
    this.nameInput = "";
    this.colorInput = "";
    this.updateNameInput = "";
    this.updateColorInput = "";
    this.selectedCarId = "";
  }

  init() {
    this.updateTotalCarsCount();
    this.updatePageNum();
    this.drawGarage();
  }

  async updateTotalCarsCount() {
    this.totalCarCount = (await getAllCars()).length;
    this.garageView.updateTotalCarCount(this.totalCarCount);
  }

  async createHundredCars() {
    const arrCars = [];
    let i = 0;
    while (i !== 100) {
      const name = getRandomModel();
      const color = getRandomColor();
      const carData = { name, color };
      const car = fetch(`http://127.0.0.1:3000/garage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });
      arrCars.push(car);
      i += 1;
    }

    Promise.all(arrCars);
    this.updateTotalCarsCount();
    this.drawGarage();
  }

  async drawGarage() {
    this.cars = await getCars(this.page);
    this.garageView.drawGarage(this.cars);
  }

  async createCar() {
    this.newCar = await createCar({
      name: this.nameInput,
      color: this.colorInput,
    });
    this.garageView.drawCar(this.newCar);
    this.updateTotalCarsCount();
  }

  updatePageNum() {
    this.garageView.updatePageNum(this.page);
  }

  switchToPrev() {
    if (this.page > 1) {
      this.page -= 1;
      this.drawGarage();
      this.updatePageNum();
      this.garageView.updatePrevBtn(this.page);
    }
  }

  switchToNext() {
    this.page += 1;
    this.drawGarage();
    this.updatePageNum();
    this.garageView.updatePrevBtn(this.page);
  }

  async updateSelectedCar() {
    this.newCar = await updateCar(
      { name: this.updateNameInput, color: this.updateColorInput },
      Number(this.selectedCarId),
    );
    this.garageView.updateSelectedCar(
      this.updateNameInput,
      this.updateColorInput,
    );
    this.garageView.offUpdateFormState();
  }

  // eslint-disable-next-line class-methods-use-this
  race() {
    console.log("race");
    currentCarsOnPage.forEach((car) => {
      car.startEngine();
    });
  }
}
