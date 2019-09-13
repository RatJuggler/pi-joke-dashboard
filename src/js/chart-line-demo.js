// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Line Chart Example
var ctx = document.getElementById("myLineChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      label: "Nala",
      backgroundColor: "rgb(75, 192, 192, 0.05)",
      borderColor: "rgba(75, 192, 192, 1)",
      data: [],
      fill: "false"
    }, {
      label: "Marnie",
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      data: [],
      fill: "false"
    }],
  },
  options: {
    tooltips: {
      mode: 'nearest',
      intersect: false,
    },
    scales: {
      xAxes: [{
        type:'realtime',
        realtime: {
          delay: 5000,
          duration: 100000,
          refresh: 5000,
          onRefresh: function(chart) {
            chart.data.datasets.forEach(function(dataset) {
              dataset.data.push({
                x: Date.now(),
                y: Math.floor((Math.random() * 100))
              })
            })
          }
        }
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
