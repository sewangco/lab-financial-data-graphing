const apiUrl =
  "http://api.coindesk.com/v1/bpi/historical/close.json?start='2020-08-10'&end=2020-09-09";

const printTheChart = (stockData) => {
  //first get the daily data
  const dailyData = stockData.bpi;
  console.log({ dailyData });

  // this is the data for the x axis:
  const stockDates = Object.keys(dailyData);
  console.log({ stockDates });

  //this is the data for the y axis:
  const stockPrices = stockDates.map((date) => {
    return dailyData[date];
  });
  console.log(stockPrices);

  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrices,
        },
      ],
    },
  });
};

axios
  .get(apiUrl)
  .then((response) => {
    printTheChart(response.data);
    console.log(response.data);
  })
  .catch((error) => {
    console.log(`Error while getting the data`, error);
  });
