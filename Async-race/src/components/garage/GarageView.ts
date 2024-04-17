import { CarData, checkedQuerySelector } from "../../types";
import currentCarsOnPage from "../../utils/currentCars";
import Car from "../car/Car";
import CarComponent from "../car/CarComponent";
import CarController from "../car/CarController";
import CarView from "../car/CarView";

export default class GarageView {
  container: HTMLElement;

  carsContainer: HTMLDivElement | null;

  prevBtn: HTMLButtonElement | null;

  formState: boolean;

  constructor(container: HTMLElement) {
    this.container = container;
    this.carsContainer = null;
    this.prevBtn = null;
    this.formState = true;
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
    console.log(currentCarsOnPage);
  }

  drawCar(carData: CarData) {
    if (this.carsContainer === null) throw new Error("target equals null");
    const carElContainer = document.createElement("div");
    carElContainer.innerHTML = CarComponent(carData.id as number);
    this.carsContainer.append(carElContainer);

    const model = checkedQuerySelector(
      carElContainer,
      ".car-model",
    ) as HTMLElement;
    const track = checkedQuerySelector(
      carElContainer,
      ".car-track",
    ) as HTMLElement;

    const carView = new CarView(carElContainer);
    const car = new Car(
      carView,
      carData.name as string,
      carData.color as string,
      carData.id as number,
      model as HTMLElement,
      track as HTMLElement,
    );
    car.init();
    const carController = new CarController(car, carElContainer);
    carController.init();
    currentCarsOnPage.push(car);
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

  updateSelectedCar(name: string, color: string) {
    const carElContainer = checkedQuerySelector(
      this.container,
      ".selected",
    ) as HTMLElement;

    const model = checkedQuerySelector(
      carElContainer,
      "#car-title",
    ) as HTMLElement;

    console.log(model);

    const icon = checkedQuerySelector(carElContainer, ".icon") as HTMLElement;

    model.innerHTML = name;
    icon.style.fill = color;

    carElContainer.classList.remove("selected");
  }

  offUpdateFormState() {
    // сделать форму с инпутами не кликабельной и убрать вокус в инпуте модели
    const updateName = checkedQuerySelector(
      document,
      "#update-name",
    ) as HTMLInputElement;

    const updateColor = checkedQuerySelector(
      document,
      "#update-color",
    ) as HTMLInputElement;

    const updateBtn = checkedQuerySelector(
      document,
      "#update",
    ) as HTMLInputElement;

    updateColor.setAttribute("disabled", "disabled");
    updateName.setAttribute("disabled", "disabled");
    updateBtn.setAttribute("disabled", "disabled");
    this.formState = false;
  }
}
