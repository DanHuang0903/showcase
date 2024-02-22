// function getData(){
//     let chartdataset = [];
//     let content = [];
//     let player = [];
//     let player_filtered = [];
//     const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQS8ZgEo2FxRCUQi562fZ72A6jeEO3jkWMR1VRDgossR_-mMUhVFTJw0avWiTqS5-Z4npbjWX1sC5Ig/pub?output=csv';
//     d3.csv(csvUrl).then(function(data){

    
//     data.forEach( (c, row) =>{
//         if(c['内容'] != '抽奖'){
//         content.push(c['内容'])
//         let people = c['参与者'].split('，');
//         people.forEach((p,i) => {
//             people[i] = p.split('-')[0];
//             player_filtered.push(people[i]);
//         });
//         player[row] = people;
        
//         }
//     });
//     player = player.filter(item=>item);
//     player_filtered = [...new Set(player_filtered)];

//     player.forEach((p,index)=>{
//         console.log(index);
//         p.forEach((n)=>{
//         chartdataset.push([content[index],n,1]);

//         })
        
//         });
        



//     })

//     // const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`;

//     // fetch(url)
//     //   .then(response => {
//     //     if (!response.ok) {
//     //         throw new Error('Network response was not ok');
//     //     }
//     //     return response.json();
//     //   })
//     //   .then(data => {
//     //     console.log(data.values);
//     //   })
//     //   .catch(error => console.log('Error:', error));
// }