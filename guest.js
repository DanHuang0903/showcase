async function guestChart(){
    const guestUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTx5clch28qC50hUK9AYWcMGThVPXriblViKLxtMxMq35RUYkETQeY3_goxrOcGxKi9J8L5Gs7bFqUW/pub?output=csv';
    const guestData = await d3.csv(guestUrl);
     console.log(guestData);
}