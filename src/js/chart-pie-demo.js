// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
let ctxPieChart = document.getElementById("myPieChart");
new Chart(ctxPieChart, {
  type: 'doughnut',
  data: {
    labels: ["Frog Spawn", "Tadpoles", "Frogs", "Newts", "Crocodiles"],
    datasets: [{
      data: [5, 20, 40, 30, 5],
      backgroundColor: ['#4e73df', '#858796', '#1cc88a', '#36b9cc', '#f6c23e'],
      hoverBackgroundColor: ['#224abe', '#60616f', '#13855c', '#258391', '#dda20a'],
      hoverBorderColor: "rgba(234, 236, 244, 1)"
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10
    },
    legend: {
      display: false
    },
    cutoutPercentage: 60
  },
});
