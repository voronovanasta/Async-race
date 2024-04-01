const garageComponent = () => `<div class="garage-wrapper">
<form id="create-form" class="create-form">
<div class="item">
    <label for="name"></label>
    <input id="name" name="name" type="text" autocomplete="on" placeholder = "name">
 </div>
 <div class="item">
     <label for="color"></label>
     <input id="color" name="color" type="color" value="#e66465" autocomplete="on">
 </div>
 <button id = "create-btn">Create</button>
</form>
<form id="update-form" class="update-form">
<div class="item">
    <label for="update-name"></label>
    <input id="update-name" name="name" type="text" autocomplete="on" placeholder = "name">
 </div>
 <div class="item">
     <label for="update-color"></label>
     <input id="update-color"  name="color" type="color" value="#f6b73c"  autocomplete="on">
 </div>
 <button id = "update-btn">Update</button>
</form>
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
