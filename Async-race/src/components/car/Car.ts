import { deleteCar, getAllCars } from "../../api";

import CarView from "./CarView";

export default class Car {
  name: string;

  color: string;

  id: number;

  carView: CarView;

  constructor(carView: CarView, name: string, color: string, id: number) {
    this.name = name;
    this.color = color;
    this.id = id;
    this.carView = carView;
  }

  init() {
    this.carView.drawCar(this.name, this.color);
  }

  updateSelectedCar() {
    this.carView.updateSelectedCar();
    this.carView.onUpdateFormState();
  }

  async deleteCar() {
    await deleteCar(this.id);
    const totalCarCount = (await getAllCars()).length;
    this.carView.changeTotalCountCars(totalCarCount);
    this.carView.deleteCar();
  }
}
