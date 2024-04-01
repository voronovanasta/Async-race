import { CarData, checkedQuerySelector } from "../../types";

export default class GarageView {
  container: HTMLElement;

  carsContainer: HTMLDivElement | null;

  prevBtn: HTMLButtonElement | null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.carsContainer = null;
    this.prevBtn = null;
  }

  init() {
    this.carsContainer = checkedQuerySelector(
      this.container,
      ".cars-container",
    ) as HTMLDivElement;

    this.prevBtn = checkedQuerySelector(
      document,
      "#previous",
    ) as HTMLButtonElement;
  }

  drawGarage(cars: CarData[]) {
    if (this.carsContainer === null) throw new Error("target equals null");
    this.carsContainer.innerHTML = "";
    cars.forEach((car) => {
      this.drawCar(car);
    });
  }

  async drawCar(car: CarData) {
    // перенести создане машин в класс машина
    if (this.carsContainer === null) throw new Error("target equals null");
    const carDiv = document.createElement("button");
    carDiv.textContent = `${car.name}`;
    carDiv.style.backgroundColor = car.color as string;
    this.carsContainer.append(carDiv);
  }

  updateTotalCarCount(count: number) {
    const title = checkedQuerySelector(this.container, "#title");
    title.textContent = `Garage(${count})`;
  }

  updatePageNum(pageNum: number) {
    const page = checkedQuerySelector(this.container, "#page");
    page.textContent = `Page(${pageNum})`;
  }

  updatePrevBtn(page: number) {
    if (this.prevBtn === null) throw new Error("target equals null");
    if (page > 1) {
      this.prevBtn.removeAttribute("disabled");
    } else {
      this.prevBtn.setAttribute("disabled", "disabled");
    }
  }
}
