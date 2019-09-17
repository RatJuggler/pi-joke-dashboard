// Bar Chart Example
let grassHeight = Math.floor(10 + (Math.random() * 20));

function onRefreshGrowGrass(chart) {
  chart.config.data.datasets.forEach(function(dataset) {
    grassHeight = Math.floor(grassHeight + (Math.random() * 4) - 2);
    if (grassHeight > 30) {
      grassHeight = 30;
    }
    if (grassHeight < 10) {
      grassHeight = 10;
    }
    dataset.data.push({
      x: Date.now(),
      y: grassHeight
    });
  });
}

let ctxBarChart = document.getElementById("myBarChart");
new Chart(ctxBarChart, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: "Grass Height",
      backgroundColor: "#4DBD33",
      hoverBackgroundColor: "#395D33",
      borderColor: "#4DBD33",
      data: [],
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      enabled: false
    },
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          delay: 200,
          duration: 4000,
          refresh: 200,
          onRefresh: onRefreshGrowGrass
        },
        scaleLabel: {
          display: true,
          labelString: 'Blades of Grass'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
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
    }
  }
});
