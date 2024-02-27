
async function guestChart(){
 const guestUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTx5clch28qC50hUK9AYWcMGThVPXriblViKLxtMxMq35RUYkETQeY3_goxrOcGxKi9J8L5Gs7bFqUW/pub?output=csv';

  const guest = await d3.csv(guestUrl);
    const data = {};
   guest.splice(guest.length - 1, 1); 

   let labels = guest.columns;
   labels.splice(3,1);
   labels.splice(4,1)
   
   labels.forEach(c => {
    data[c] = [];
   })
   
   guest.forEach(g => {
    delete g.女孩年龄;
    delete g.男孩年龄;
    labels.forEach(c => {
        data[c].push(g[c]);
    })
   });

   drawChart(data);
   drawPie(data);

}


function drawChart(data){
        let family = data.家庭;
        let girls = data.女孩人数;
        let boys = data.男孩人数;
        let parents = data.成人人数;
        let total = data.总人数;
        let barChart = $('#guest-chart');

         barChart.height(350);
         barChart.width(990);
         new Chart(barChart, {
         type: 'bar',
         data: {
         labels: family,
         datasets: [{
             label: '女孩人数',
             data: girls,
             backgroundColor: "#FFB6C1",
             barPercentage: 0.8,
             stack: 'Stack 0'
             },
             {
             label: '男孩人数',
             data: boys,
             backgroundColor: "#FFA07A",
             barPercentage: 0.8,
             stack: 'Stack 0'
             },
             {
             label: '成人人数',
             data: parents,
             backgroundColor: "#008B8B",
             barPercentage: 0.8,
             stack: 'Stack 0'
             }]
         },
         options: {
             plugins: {
             title: {
                 display: true,
                 text: '',
                 font:{
                 size: 16
                 }
             },
             },
             responsive: false,
             maintainAspectRatio: false,
             animation:true,
             interaction: {
             intersect: false,
             },
             scales: {
             x: {
                 stacked: true
             },
             y: {
                 stacked: true,
                 beginAtZero: true
             }
             }
         }
         });
}

function drawPie(data){
    let girlsTotal = 0;
    let boysTotal = 0;
    let parentsTotal = 0;

    let girls = data.女孩人数;
    let boys = data.男孩人数;
    let parents = data.成人人数;
   

    girls.forEach(g => {
        girlsTotal += parseInt(g);
    });

    boys.forEach(b => {
        boysTotal += parseInt(b);
    });

    parents.forEach(p => {
        parentsTotal += parseInt(p);
    })

    let total = parseInt(girlsTotal) + parseInt(boysTotal) + parseInt(parentsTotal);

    let pie = $('#guest-chart2');
    pie.height(320);
    pie.width(320);
    new Chart(pie, {
        type: 'polarArea',
        data: {
        labels: ['女孩总数','男孩总数','成年人总数'],
        datasets: [
            {
            label: '总数统计',
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
            data: [girlsTotal,boysTotal,parentsTotal]
            }
        ]
        },
        options: {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxHeight: 10,
                        boxWidth:15,
                        padding: 5,
                        font: {
                            size:10
                        }
                    }
                },
                title: {
                display: true,
                text: "总数统计 - " + total + " in total",
                font:{
                size: 16
                }
            },
            },
            scales: {
                r: {
                    ticks: {
                        z: 10,
                        showLabelBackdrop: false,
                        font: {
                            weight: 500,

                        }
                    }
                }
            },
            responsive: false,
            maintainAspectRatio: false
        }
    });

}

