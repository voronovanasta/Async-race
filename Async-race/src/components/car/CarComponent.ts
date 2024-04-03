const CarComponent = (
  id: number,
) => `<div class="car-container" data-id="${id}">
<div class="config-btns">
<button id="select">Select</button><button id="delete">Remove</button><p id="car-model"></p></div>
<button id="start">A</button><button id="stop">B</button>
<div class="car-track">
<svg class="icon">
  <use xlink:href="../../assets/img/sprite.svg#car"></use>
</svg>
<svg class="icon">
  <use xlink:href="../../assets/img/sprite.svg#finish"></use>
</svg>
</div>
</div>
`;
export default CarComponent;
