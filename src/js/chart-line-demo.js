// Line Chart Example
let ctxLineChart = document.getElementById("myLineChart");
new Chart(ctxLineChart, {
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
    maintainAspectRatio: false,
    tooltips: {
      mode: 'nearest',
      intersect: false
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
