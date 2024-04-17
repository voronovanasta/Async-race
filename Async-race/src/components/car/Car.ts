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

  animationId: number;

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
    this.speed = 0;
    this.track = track;
    this.isFinish = false;
    this.animationId = 0;
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
    console.log(this.speed);
    if (this.x + this.model.offsetWidth >= this.track.clientWidth) {
      this.x = this.track.clientWidth;
      this.isFinish = true;
    }
    this.updateX();
  }

  start() {
    console.log("start on animation");
    console.log(this.isFinish);
    if (!this.isFinish) {
      this.move();
      this.animationId = requestAnimationFrame(() => {
        this.start();
      });
    }
  }

  stop(position = "72px") {
    cancelAnimationFrame(this.animationId);
    const pos = position;
    this.x = parseInt(pos, 10);
    this.model.style.left = pos;
    this.isFinish = false;
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
      this.speed = (this.track.offsetWidth / time) * 10;
      console.log(this.speed);
      this.driveCar();
    } catch (err) {
      console.log(err);
    }
  }

  async driveCar() {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/engine/?id=${this.id}&status=drive`,
        {
          method: "PATCH",
        },
      );

      const data = await response.json();

      if (response.status === 500) {
        setEngine("stopped", this.id);
        this.stop(this.x.toString());
        console.log("500");
      } else {
        this.start();
      }
    } catch (e) {
      throw new Error("the car is broken.");
    }
  }

  async stopEngine() {
    const engine = await setEngine("stopped", this.id);
    const time: number = engine.distance / engine.velocity;
    this.speed = this.track.offsetWidth / time;
    console.log("stop");
    console.log(this.speed);
  }
}
