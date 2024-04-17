import { checkedQuerySelector } from "../../types";
import GarageModel from "./GarageModel";

export default class GarageController {
  model: GarageModel;

  container: HTMLElement;

  constructor(model: GarageModel, container: HTMLElement) {
    this.model = model;
    this.container = container;
  }

  init() {
    this.inputEventHandler();
    this.clickEventHandler();
    const inputColor = checkedQuerySelector(
      this.container,
      "#update-color",
    ) as HTMLInputElement;
    console.log(inputColor.value);
  }

  inputEventHandler() {
    this.container.addEventListener("input", (e) => {
      if (e.target === null) throw new Error("target equals null");
      const input: HTMLInputElement = e.target as HTMLInputElement;

      switch (input.id) {
        case "name":
          console.log("input");
          this.model.nameInput = input.value;
          break;
        case "color":
          this.model.colorInput = input.value;
          break;
        case "update-name":
          this.model.updateNameInput = input.value;
          break;
        case "update-color":
          this.model.updateColorInput = input.value;
          console.log(input.value);
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
          this.model.selectedCarId = this.getSelectedCarId();
          this.model.updateSelectedCar();
          break;
        case "generate":
          this.model.createHundredCars();
          break;
        case "previous":
          this.model.switchToPrev();
          break;
        case "next":
          this.model.switchToNext();
          break;
        case "race":
          this.model.race();
          break;
        default:
          break;
      }
    });
  }

  getSelectedCarId() {
    const selectedCar = checkedQuerySelector(this.container, ".selected");
    const carContainer = checkedQuerySelector(
      selectedCar,
      ".car-container",
    ) as HTMLDivElement;
    return carContainer.dataset.id as string;
  }
}
