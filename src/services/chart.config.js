export const lineChartData = {
    datasets: [
        {
            type: "scatter",
            label: "Center Room",
            showLine: true,
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: '#9dfd87',
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            borderWidth: "1",
            lineTension: 0.05,
            data: [],
            yAxisID: 'A'
        },
        {
            type: "scatter",
            label: "Near Window",
            showLine: true,
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: '#fdde87',
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            borderWidth: "1",
            lineTension: 0.05,
            data: [],
            yAxisID: 'A'
        }, {
            type: "scatter",
            label: "Outside",
            showLine: true,
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: '#21a5f3',
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            borderWidth: "1",
            lineTension: 0.05,
            data: [],
            yAxisID: 'B'
        },
    ]
};

export const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    padding: 10,
    title: {
        display: true,
        text: "HOURLY TEMPERATURE",
        fontSize: 25,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontColor: 'white',
        padding: 15,
    },
    tooltips: {
        enabled: true,
        mode: 'index',
        intersect: false,
        fontColor: 'white',
    },
    scales: {
        yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'left',
            gridLines: {
                display: true,
                color: '#ffffff45'
            },
            ticks: {
                lineHeight: 2.5,
                fontSize: 16,
                fontFamily: 'Roboto',
                fontColor: 'white',
                stacked: true,
                callback: value => `${value} °`
            }
        }, {
            id: 'B',
            type: 'linear',
            position: 'right',
            gridLines: {
                display: true,
                color: '#ffffff45'
            },
            ticks: {
                auto: true,
                lineHeight: 2.5,
                fontSize: 22,
                fontFamily: 'Roboto',
                fontColor: '#21a5f3',
                stacked: true,
                callback: value => `${value} °`
            }
        }],
        xAxes: [{
            type: 'time',
            distribution: 'series',
            gridLines: {
                display: false,
                color: 'white'
            },
            time: {
                unit: 'hour',
                displayFormats: {
                    quarter: 'h:mm a'
                }
            },
            ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                maxTicksLimit: 10,
                lineHeight: 2.5,
                fontSize: 16,
                fontFamily: 'Roboto',
                fontColor: 'white',
            }
        }]
    },
    legend: {
        labels: {
            fontColor: "white",
            fontSize: 18
        }
    },
};

export const barChartData = {
    labels: ["1", "2", "3", '4', '5'],
    datasets: [
        {
            label: "Center Room",
            backgroundColor: ["#9dfd87"],
            borderColor: 'white',
            borderWidth: "1",
            lineTension: 0.05,
            data: [],
        }, {
            label: "Near window",
            backgroundColor: ["#fdde87"],
            borderColor: 'white',
            borderWidth: "1",
            lineTension: 0.05,
            data: [],
        }, {
            label: "Outside",
            backgroundColor: ["#21a5f3"],
            borderColor: 'white',
            borderWidth: "1",
            lineTension: 0.05,
            data: [],
        }
    ]
};

export const barChartOptions = {
    responsive: true,
    legend: { display: false },
    title: {
        display: true,
        text: 'WEEKLY AVERAGE TEMPERATURE',
        fontSize: 25,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontColor: 'white',
        padding: 15,
    },
    scales: {
        xAxes: [{
            barPercentage: 1,
            ticks: {
                mirror: true,
            }
        }],
        yAxes: [{
            ticks: {
                auto: false,
            },
            gridLines: {
                offsetGridLines: true
            },
            stacked: false
        }],
    },
    plugins: {
        datalabels: {
            display: true,
            color: 'white',
            align: 'center',
            anchor: 'center'
        }
    }
};