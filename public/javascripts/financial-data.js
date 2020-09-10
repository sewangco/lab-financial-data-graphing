const apiUrl =
  "http://api.coindesk.com/v1/bpi/historical/close.json?start=2020-08-10&end=2020-09-01";

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

//add event listener

document.getElementById("start").addEventListener("change", getDataFromApi);
document.getElementById("end").addEventListener("change", getDataFromApi);

function getDataFromApi() {
  let inputFrom = document.getElementById("start").value;
  let inputTo = document.getElementById("end").value;

  let url =
    inputFrom && inputTo
      ? `http://api.coindesk.com/v1/bpi/historical/close.json?start=${inputFrom}&end=${inputTo}`
      : "http://api.coindesk.com/v1/bpi/historical/close.json";
  axios
    .get(url)
    .then((response) => {
      printTheChart(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(`Error while getting the data`, error);
    });
}

getDataFromApi();
