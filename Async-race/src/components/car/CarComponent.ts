import svgSprite from "../../assets/img/sprite.svg";

const CarComponent = (
  id: number,
) => `<div class="car-container" data-id="${id}">
<div class="config-btns">
<button id="select">Select</button><button id="delete">Remove</button><p id="car-title"></p></div>
<div class="track-wrapper"><button id="start">A</button><button id="stop">B</button>
<div class="car-track">
<div class="car-model"><svg class="icon">
  <use xlink:href="${svgSprite}#car"></use>
</svg>
</div>
<svg class="icon icon-finish">
  <use xlink:href="${svgSprite}#finish"></use>
</svg>
</div>
</div>
</div>
`;
export default CarComponent;
