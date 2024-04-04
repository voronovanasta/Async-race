import Car from "./Car";

export default class CarController {
  container: HTMLDivElement;

  carModel: Car;

  constructor(car: Car, container: HTMLDivElement) {
    this.container = container;
    this.carModel = car;
  }

  init() {
    this.eventHandler();
  }

  eventHandler() {
    this.container.addEventListener("click", (e) => {
      if (e.target === null) throw new Error("target equals null");
      const button: HTMLButtonElement = e.target as HTMLButtonElement;
      switch (button.id) {
        case "delete":
          this.carModel.deleteCar();
          break;
        case "select":
          this.carModel.updateSelectedCar();
          break;
        case "start":
          this.carModel.startEngine();
          this.carModel.start();
          break;
        case "stop":
          this.carModel.stopEngine();
          this.carModel.stop();
          break;
        default:
          break;
      }
    });
  }
}
