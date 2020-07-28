var list = document.querySelectorAll('li')[1];
list.style.textDecoration = 'line-through';

let mainList = document.querySelector('ul');

// function addtask that adds a task
function AddTask() {

  // adding listitem in list
  let li = document.createElement("li");
  mainList.prepend(li);

  // creating and adding requied attributes and listeners

  let input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.addEventListener('click', Complete);
  li.append(input);

  let p = document.createElement("p");
  p.textContent = document.getElementById("input").value;
  li.append(p);

  let button = document.createElement('button');
  button.textContent = 'Delete Task';
  button.addEventListener('click', Delete);
  li.append(button);


  // function to complete and uncomplete a task
  function Complete(ev) {
    if (ev.target.checked) {

      let selectedIndex = ev.target.parentNode;
      selectedIndex.querySelector('p').style.textDecoration = 'line-through';
      mainList.append(selectedIndex);
    } else {

      let selectedIndex = ev.target.parentNode;
      selectedIndex.querySelector('p').style.textDecoration = 'none';
      mainList.prepend(selectedIndex);
    }
  }
  // function to remove a task
  function Delete(ev) {
    mainList.remove(ev.target.parentNode);
  }
}

add = document.getElementById("add");
add.addEventListener('click', AddTask);

// Added Event Listener for enter to add task
document.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    AddTask();
  }
}, false);


let map;
let infoWindow;
let mapSpot = document.getElementById("map");
let georgian = {
  lat: -34.397,
  lng: 150.644
};

function initMap() {
  map = new google.maps.Map(mapSpot, {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  //try geolocation

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation ?
    "Error: The Geolocation service has failed." :
    "Error: Your browser doesn't support geolocation"
  );
  infoWindow.open(map);
}


//Getting help from https://enlight.nyc/projects/weather
//Weather API Example
function Weather() {
  let tempt = document.getElementById("temperature");
  let location = document.getElementById("location");
  let descrp = document.getElementById("description");


  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "d65154c997cc0b7f4bbe256641dec1a2";
  location.innerHTML = "Locating your Location...";

  navigator.geolocation.getCurrentPosition(passed, fault);

  function passed(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url = api + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let temp = data.main.temp;
        tempt.innerHTML = temp + "° C";
        location.innerHTML =
          data.name + " (" + latitude + "°, " + longitude + "°)";
        descrp.innerHTML = data.weather[0].main;
      });
  }

  function fault() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

Weather();