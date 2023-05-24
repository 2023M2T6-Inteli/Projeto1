
// Dados de exemplo para os gráficos de barras
var chartData1 = {
  labels: ['Turma A', 'Turma B', 'Turma C'],
  datasets: [{
    label: 'Example Dataset',
    data: [10, 20, 30],
    backgroundColor: ['red', 'blue', 'yellow']
  }]
};

var chartData2 = {
  labels: ['Turma A', 'Turma B', 'Turma C'],
  datasets: [{
    label: 'Example Dataset',
    data: [50, 30, 20],
    backgroundColor: ['green', 'orange', 'purple']
  }]
};

var chartData3 = {
  labels: ['Turma A', 'Turma B', 'Turma C'],
  datasets: [{
    label: 'Example Dataset',
    data: [15, 25, 40],
    backgroundColor: ['pink', 'gray', 'brown']
  }]
};

// Opções de configuração dos gráficos
var chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

// Criar os gráficos de barras
var ctx1 = document.getElementById('chart1').getContext('2d');
new Chart(ctx1, {
  type: 'bar',
  data: chartData1,
  options: chartOptions
});

var ctx2 = document.getElementById('chart2').getContext('2d');
new Chart(ctx2, {
  type: 'bar',
  data: chartData2,
  options: chartOptions
});

var ctx3 = document.getElementById('chart3').getContext('2d');
new Chart(ctx3, {
  type: 'bar',
  data: chartData3,
  options: chartOptions
});

window.addEventListener('scroll', function() {
  var header = document.getElementsByClassName('header-container')[0];
  var logoImage = document.querySelector('.logo-header');
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition > 0) {
    header.classList.add('scrolled');
    logoImage.src = './assets/logoPink.png'
    console.log(header)
  } else {
    header.classList.remove('scrolled');
    logoImage.src = './assets/logo.png'
    console.log(header)
  }
});
