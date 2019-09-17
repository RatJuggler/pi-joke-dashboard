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

dinosaurs = new Dinosaurs();
dinosaurs.populateFromFile("https://raw.githubusercontent.com/junosuarez/dinosaurs/master/dinosaurs.csv");

function random(limit) {
  return Math.floor(Math.random() * limit)
}

function randomUpdate() {
  $("#dinoName").text(dinosaurs.getNextName());
  $("#cinnamonRolls").text(random(12));
  let progress = random(100);
  $("#piProgressLabel").text(progress + '%');
  $("#piProgressBar").css('width', progress + '%').attr("aria-valuenow", progress);
  let frogs = 30 + random(20);
  let toads = 15 + random(10);
  let newts = 15 + random(10);
  let sharks = 2 + random(5);
  let crocodiles = 2 + random(5);
  pieChart.data.datasets[0].data = [frogs, toads, newts, sharks, crocodiles];
  pieChart.update();
}

setInterval(randomUpdate, 3000);
