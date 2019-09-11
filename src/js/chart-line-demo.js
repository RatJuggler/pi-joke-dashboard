// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

this._seed = 1;


// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
function activity() {
  return Math.round(rand(0, 100));
}

function rand(min, max) {
  var seed = this._seed;
  min = min === undefined ? 0 : min;
  max = max === undefined ? 1 : max;
  this._seed = (seed * 9301 + 49297) % 233280;
  return min + (this._seed / 233280) * (max - min);
}

// Line Chart Example
var ctx = document.getElementById("myLineChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
    datasets: [{
      label: "Nala",
      backgroundColor: "rgb(75, 192, 192, 0.05)",
      borderColor: "rgba(75, 192, 192, 1)",
      data: [
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity()
      ],
      fill: "false"
    }, {
      label: "Marnie",
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      data: [
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity(),
        activity()
      ],
      fill: "false"
    }],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: 'nearest',
      intersect: false,
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Hour'
        },
        ticks: {
          maxTicksLimit: 24
        },
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Activity Level'
        },
        ticks: {
          min: 0,
          max: 100,
          stepSize: 10
        }
      }]
    }
  }
});
