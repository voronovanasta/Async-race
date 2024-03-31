import "./assets/img/car.svg";
import "./index.css";
import GarageView from "./components/garage/GarageView";
import GarageModel from "./components/garage/GarageModel";

const garageView = new GarageView();
const garageModel = new GarageModel(garageView);
garageModel.createHundredCars();
garageModel.updateTotalCarsCount();

// const data = {
//   name: "BMW",
//   color: "#CD5C5C",
// };
// garageView.drawCar(data);
