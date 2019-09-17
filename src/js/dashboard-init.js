// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';


class Dinosaurs {
  //names;  // Contains all the names we could use.
  //n;       // Index of the next name to use.
  // Define the initial text to show while the file loads.
  constructor() {
    this.names = ["TYRANNOSAURUS", "TRICERATOPS", "VELOCIRAPTOR", "STEGOSAURUS", "SPINOSAURUS", "ARCHAEOPTERYX", "BRACHIOSAURUS", "ALLOSAURUS", "APATOSAURUS", "DILOPHOSAURUS"];
    this.n = 0;
  }
  populateFromFile(file) {
    // Extract names from the file, split by line and convert to upper case.
    fetch(file)
      .then(response => response.text())
      .then(text => this.names = text.split('\n').map(s => s.toUpperCase()));
  }
  getNextName() {
    if (this.n === this.names.length) {
      this.n = 0;
    }
    return this.names[this.n++];
  }
}

let dinosaurs = new Dinosaurs();
dinosaurs.populateFromFile("https://raw.githubusercontent.com/junosuarez/dinosaurs/master/dinosaurs.csv");

function random(limit) {
  return Math.floor(Math.random() * limit)
}

let numberOfAlerts = 0;
let alertContainer = $("#alertsContainer");
const alertCount = '<span class="badge badge-danger badge-counter" id="alertsCounter">0</span>';
const alertHeader = '<h6 class="dropdown-header">Alerts Center</h6>';
const alertStart = '<a class="dropdown-item d-flex align-items-center" href="#"><div class="mr-3"><div class="icon-circle bg-danger"><i class="fas fa-exclamation-triangle text-white"></i></div></div><div>';
const alertTime = '<div class="small text-gray-500">#TIME#</div>';
const alertText = '<span class="font-weight-bold">#TEXT#</span>';
const alertEnd = '</div></a>';
const overAlerts = '<a class="dropdown-item text-center small text-danger" href="#">Too many alerts to show!</a>';

function addAlert(description) {
  if (numberOfAlerts === 0) {
    alertContainer.html(alertHeader);
    $('#alertsDropdown').append(alertCount)
  }
  numberOfAlerts++;
  $('#alertsCounter').text(numberOfAlerts);
  if (numberOfAlerts > 9) {
    if (numberOfAlerts === 10) {
      alertContainer.append(overAlerts);
    }
  } else {
    let alertAt = alertTime.replace("#TIME#", new Date().toLocaleString());
    let alertFor = alertText.replace("#TEXT#", description);
    let newAlert = alertStart + alertAt + alertFor + alertEnd;
    alertContainer.append(newAlert);
  }
}

function pieChartUpdate() {
  let frogs = 30 + random(21);
  let toads = 15 + random(11);
  let newts = 15 + random(11);
  let sharks = random(8);
  let crocodiles = random(8);
  pieChart.data.datasets[0].data = [frogs, toads, newts, sharks, crocodiles];
  pieChart.update();
  if (sharks > 6) {
    addAlert("More than 6 sharks seen!");
  }
  if (crocodiles > 6) {
    addAlert("More than 6 crocodiles seen!")
  }
}

setInterval(function () {
  $("#dinoName").text(dinosaurs.getNextName());
}, 1000);

setInterval(function () {
  $("#cinnamonRolls").text(random(12));
}, 5000);

setInterval(function () {
  let progress = random(100);
  $("#piProgressLabel").text(progress + '%');
  $("#piProgressBar").css('width', progress + '%').attr("aria-valuenow", progress);
}, 2000);

setInterval(pieChartUpdate, 3000);
