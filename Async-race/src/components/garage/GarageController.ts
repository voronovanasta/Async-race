import { checkedQuerySelector } from "../../types";
import GarageModel from "./GarageModel";

export default class GarageController {
  model: GarageModel;

  container: HTMLElement;

  carsContainer: HTMLDivElement | null;

  constructor(model: GarageModel, container: HTMLElement) {
    this.model = model;
    this.container = container;
    this.carsContainer = null;
  }

  init() {
    this.inputEventHandler();
    this.clickEventHandler();
    this.carsContainer = checkedQuerySelector(
      this.container,
      ".cars-container",
    ) as HTMLDivElement;
  }

  inputEventHandler() {
    const nameInput = checkedQuerySelector(
      this.container,
      "#name",
    ) as HTMLInputElement;
    const colorInput = checkedQuerySelector(
      this.container,
      "#color",
    ) as HTMLInputElement;
    this.container.addEventListener("input", (e) => {
      if (e.target === null) throw new Error("target equals null");
      const input: HTMLInputElement = e.target as HTMLInputElement;

      switch (input.id) {
        case "name":
          this.model.nameInput = nameInput.value;
          break;
        case "color":
          this.model.colorInput = colorInput.value;
          break;
        case "update-name":
          this.model.nameInput = nameInput.value;
          break;
        case "update-color":
          this.model.colorInput = colorInput.value;
          break;
        default:
          break;
      }
    });
  }

  clickEventHandler() {
    document.addEventListener("click", (e) => {
      if (e.target === null) throw new Error("target equals null");
      const button: HTMLButtonElement = e.target as HTMLButtonElement;

      switch (button.id) {
        case "create":
          this.model.createCar();
          break;
        case "update":
          // this.model.updateCar();
          break;
        case "generate":
          this.model.createHundredCars();
          break;
        case "previous":
          this.model.switchToPrev();
          break;
        case "next":
          console.log("prev");
          this.model.switchToNext();
          break;
        default:
          break;
      }
    });
  }

  //   checkSelectedCar() {
  //     // в контейнере машин найти машину с классом селектиди забрать   модель ее айдишник
  //   }
}
