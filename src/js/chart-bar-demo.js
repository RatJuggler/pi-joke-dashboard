// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Bar Chart Example
var ctxBarChart = document.getElementById("myBarChart");
var myBarChart = new Chart(ctxBarChart, {
  type: 'bar',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Grass Height",
      backgroundColor: "#4DBD33",
      hoverBackgroundColor: "#395D33",
      borderColor: "#4DBD33",
      data: [10, 10, 11, 13, 17, 25, 25, 20, 15, 13, 11, 10],
    }],
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 12
        },
        maxBarThickness: 30,
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Grass Height'
        },
        ticks: {
          min: 0,
          max: 30,
          maxTicksLimit: 5,
          padding: 10,
          // Include height units in the ticks
          callback: function(value, index, values) {
            return value + "mm";
          }
        },
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleFontColor: '#6e707e',
      titleFontSize: 16,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 2,
      displayColors: false,
      callbacks: {
        label: function(tooltipItem, chart) {
          let datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': ' + tooltipItem.yLabel + "mm";
        }
      }
    },
  }
});
