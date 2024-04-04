import { deleteCar, getAllCars, setEngine } from "../../api";

import CarView from "./CarView";

export default class Car {
  name: string;

  color: string;

  id: number;

  carView: CarView;

  model: HTMLElement;

  x: number;

  speed: number;

  track: HTMLElement;

  isFinish: boolean;

  constructor(
    carView: CarView,
    name: string,
    color: string,
    id: number,
    model: HTMLElement,
    track: HTMLElement,
  ) {
    this.name = name;
    this.color = color;
    this.id = id;
    this.carView = carView;
    this.model = model;
    this.x = 0;
    this.speed = 2;
    this.track = track;
    this.isFinish = false;
  }

  init() {
    this.carView.drawCar(this.name, this.color);
    this.getCarCoordinates();
  }

  getCarCoordinates() {
    const rect = this.model.getBoundingClientRect();
    this.x = rect.x;
  }

  updateX() {
    this.model.style.left = `${this.x}px`;
  }

  move() {
    this.x += this.speed;
    if (this.x + this.model.offsetWidth >= this.track.clientWidth) {
      this.x = this.track.clientWidth;
      this.isFinish = true;
    }
    this.updateX();
  }

  start() {
    if (!this.isFinish) {
      this.move();
      requestAnimationFrame(() => {
        this.start();
      });
    }
  }

  stop() {
    this.isFinish = true;
    this.model.style.left = `72px`;
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

  async startEngine() {
    try {
      const engine = await setEngine("started", this.id);
      const time: number = engine.distance / engine.velocity;
      this.speed = this.track.offsetWidth / time;
      console.log(this.speed);
    } catch (err) {
      console.log(err);
    }
  }

  async stopEngine() {
    const engine = await setEngine("stopped", this.id);
    const time: number = engine.distance / engine.velocity;
    this.speed = this.track.offsetWidth / time;
    console.log(this.speed);
  }
}
