
 const day = [
    'mon', 'tue',
    'wed', 'thu',
    'fri', 'sat',
    'sun'
  ];

 const amount =   [17.45, 34.91,
52.36, 31.07,
23.39, 43.28,
25.48];

const ctx = document.getElementById('canvas').getContext('2d');
ctx.canvas.width = 800;

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: day,
        datasets: [{
            labels:'$',
            data: amount,
            backgroundColor: "#ff335e",
            borderRadius: 5,
        }]
    },
    options: {
        scaleShowLabels : false,
        scales: {
            y: {
                beginAtZero: true,
                grid:{
                    display:false,
                    drawBorder: false,
                },
                ticks: {
                    display: false,
                  },

            },
            x:{
                grid:{
                    display:false,
                },
             
            },
        },
        plugins:{legend: {
            display: false,
        }},
        responsive:true,
        maintainAspectRatio: true,
    },
});