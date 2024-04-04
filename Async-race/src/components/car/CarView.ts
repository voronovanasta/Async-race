import { checkedQuerySelector } from "../../types";

export default class CarView {
  carElContainer: HTMLDivElement;

  formState: boolean;

  constructor(carContainer: HTMLDivElement) {
    this.carElContainer = carContainer;
    this.formState = false;
  }

  drawCar(name: string, color: string) {
    const model = checkedQuerySelector(
      this.carElContainer,
      "#car-title",
    ) as HTMLElement;

    const icon = checkedQuerySelector(
      this.carElContainer,
      ".icon",
    ) as HTMLElement;

    model.innerHTML = name;

    icon.style.fill = color;
  }

  updateSelectedCar() {
    this.carElContainer.classList.add("selected");
  }

  onUpdateFormState() {
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

    updateColor.removeAttribute("disabled");
    updateName.removeAttribute("disabled");
    updateBtn.removeAttribute("disabled");

    updateName.focus();
    this.formState = true;
  }

  deleteCar() {
    this.carElContainer.remove();
  }

  changeTotalCountCars(count: number) {// eslint-disable-line
    const title = checkedQuerySelector(document, "#title");
    title.textContent = `Garage(${count})`;
  }
}
