
async function guestChart(){
 const guestUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTx5clch28qC50hUK9AYWcMGThVPXriblViKLxtMxMq35RUYkETQeY3_goxrOcGxKi9J8L5Gs7bFqUW/pub?output=csv';

  const guest = await d3.csv(guestUrl);
  const ages = await d3.csv(guestUrl);
  
    const data = {};
    const age = {};

   let labels = guest.columns;
   labels.splice(3,1);
   labels.splice(4,1);

   let agesLabel = ages.columns;
   agesLabel = [agesLabel[3], agesLabel[5]]

   
   labels.forEach(c => {
    data[c] = [];
   });
   
   guest.forEach(g => {
    delete g.女孩年龄;
    delete g.男孩年龄;
    labels.forEach(c => {
        data[c].push(g[c]);
    })
   });

    agesLabel.forEach(al => {
        age[al] = [];
    })

    ages.forEach(a => {
        delete a.家庭;
        delete a.成人人数;
        delete a.男孩人数;
        delete a.女孩人数;
        delete a.总人数;
        agesLabel.forEach(al => {
            age[al].push(a[al]);
        });
    });
    age.女孩年龄 = age.女孩年龄.filter(e => e !== '');
    age.男孩年龄 = age.男孩年龄.filter(e => e !== '');
 
    age.女孩年龄.forEach(g => {
        if(g.includes(',')){
            let current = g.split(',');
            age.女孩年龄.push(...current);
            age.女孩年龄 = age.女孩年龄.filter(e => e !== g);
        }
    })

    age.男孩年龄.forEach(b => {
        if(b.includes(',')){
            let current = b.split(',');
            age.男孩年龄.push(...current);
            age.男孩年龄 = age.男孩年龄.filter(e => e !== b);
        }
    })

   drawChart(data);
   drawPie(data);
   drawDonut(age);

}

function drawDonut(data){
    const DATA_COUNT = 5;
    const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
    
    let labels = [...data.男孩年龄, ...data.女孩年龄];
    label = [...new Set(labels)];
    let boys = [];
    let girls = [];
    label = label.sort();
    label.forEach(l => {
        let bn = parseInt(data.男孩年龄.length) - parseInt(data.男孩年龄.filter(e => e !== l).length);
        let gn = parseInt(data.女孩年龄.length) - parseInt(data.女孩年龄.filter(e => e !== l).length);
        boys.push(bn);
        girls.push(gn);
    })

    label = label.map( l => l + '岁');
    console.log(label)
    console.log(boys);
    console.log(girls);
    let boyLabels = [];
    boys.forEach(b => {
        let element = '男孩年龄' + b;
        boyLabels.push(element);
    })
    
    let background = generateRandomColors(label.length);
    const chartdata = {
    labels: label,
    datasets: [
        {
        backgroundColor: background,
        data: boys,
        label: '男孩'
        },
        {
        backgroundColor: background,
        data: girls,
        label: '女孩'
        }
    ]
    };
    let donut = $("#guest-chart3");
    donut.height(380);
    donut.width(380);
    new Chart(donut,{type: 'doughnut',
        data: chartdata,
        options: {
          responsive: false,
          plugins: {
            legend: {
                position: 'left',
                labels: {
                    boxHeight: 15,
                    boxWidth:15,
                    padding: 10,
                    font: {
                        size:13
                    }
                }
            },
            title: {
              display: true,
              text: '男孩女孩年龄分布',
              align: 'start',
              position: 'top',
              font:{
                size: 16
                }
            }
        },tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (context.dataset) {
                  label += ': ' + context.dataset.data[context.dataIndex];
                }
                return label;
              }
            }
          }
        },
      });

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
                 text: '家庭人数分布',
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
    pie.height(350);
    pie.width(350);
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
                    position: 'left',
                    labels: {
                        boxHeight: 15,
                        boxWidth:15,
                        padding: 10,
                        font: {
                            size:13
                        }
                    }
                },
                title: {
                display: true,
                position: 'top',
                align: 'start',
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

function generateRandomColors(numColors) {
    let colors = ["#9370DB","#D8BFD8", "#20B2AA", "#DB7093","#FFB6C1", "#228B22","#FAFAD2","#FFA500", "#ADD8E6","#00CED1","#87CEFA","#C71585","#008080","#FFD700","#FF7F50","#483D8B"];
    let get = colors.slice(0, numColors);
    return get;
    
}