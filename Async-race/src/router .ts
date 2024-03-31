import GarageModel from "./components/garage/GarageModel";
import GarageView from "./components/garage/GarageView";
import { RouterOptions } from "./types";

export default class Router {
  private routes: RouterOptions;

  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.routes = {};
  }

  init() {
    this.routes = {
      "/": () => this.launchGarage(),
      "/winners": () => this.launchWinners(),
    };
    const path = window.location.pathname;
    window.addEventListener("popstate", () => this.routes[path]());
    this.routes[path]();
  }

  launchGarage() {
    console.log("garage");
    const garageView = new GarageView(this.container);
    const garageModel = new GarageModel(garageView);
    garageModel.updateTotalCarsCount();
  }

  launchWinners() {
    console.log("winners");
    const title = document.createElement("h3");
    title.textContent = `Winners(10)`;
    this.container.append(title);
  }
}
