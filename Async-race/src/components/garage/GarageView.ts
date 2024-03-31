import { CarData } from "../../types";

export default class GarageView {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  drawGarage(cars: CarData[]) {
    cars.forEach((car) => {
      const carDiv = document.createElement("button");
      carDiv.textContent = `${car.name}`;
      carDiv.style.backgroundColor = car.color as string;
      this.container.append(carDiv);
      console.log(car);
    });
  }

  async drawCar(car: CarData) {
    // перенести создане машин в класс машина
    const carDiv = document.createElement("button");
    carDiv.textContent = `${car.name}`;
    carDiv.style.backgroundColor = car.color as string;
    this.container.append(carDiv);
    console.log(car);
  }

  updateTotalCarCount(count: number) {
    // creaate gragecompnent with html code
    const title = document.createElement("h3");
    title.textContent = `Garage(${count})`;
    this.container.append(title);
  }
}
