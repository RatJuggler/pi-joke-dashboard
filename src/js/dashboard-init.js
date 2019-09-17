// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

$("#cinnamonRolls").text(Math.floor(Math.random() * 12));
let progress = Math.floor(Math.random() * 100);
$("#piProgressLabel").text(progress + '%');
$("#piProgressBar").css('width', progress + '%').attr("aria-valuenow", progress);
