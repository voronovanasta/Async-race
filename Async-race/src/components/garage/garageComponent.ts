const garageComponent = () => `<div class="garage-wrapper">
<div class="item">
    <label for="name"></label>
    <input id="name" name="name" type="text" autocomplete="on" placeholder = "model">
    <input type="color" id="color" name="color">
    <button id = "create">Create</button>
 </div>
<div class="item">
    <label for="update-name"></label>
    <input id="update-name" name="name" type="text" autocomplete="on" placeholder = "model" disabled>
    <input id="update-color"  name="color" type="color" value="#f6b73c" disabled>
    <button id = "update" disabled>Update</button>
 </div>
<div class="garage-buttons">
<button id="race">RACE</button>
<button id="reset">RESET</button>
<button id="generate">GENERATE CARS</button>
</div>
<h2 id="title">Garage<span class="cars-totalCount"></span></h2>
<h4 id="page">Page</h4>
</div>
<div class="cars-container"></div>`;

export default garageComponent;
