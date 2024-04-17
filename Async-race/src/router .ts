import GarageController from "./components/garage/GarageController";
import GarageModel from "./components/garage/GarageModel";
import GarageView from "./components/garage/GarageView";
import garageComponent from "./components/garage/garageComponent";
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
    this.container.innerHTML = garageComponent();
    const garageView = new GarageView(this.container);
    garageView.init();
    const garageModel = new GarageModel(garageView);
    garageModel.init();
    const garageController = new GarageController(garageModel, this.container);
    garageController.init();
  }

  launchWinners() {
    console.log("winners");
    const title = document.createElement("h3");
    title.textContent = `Winners(0)`;
    this.container.append(title);
  }
}
