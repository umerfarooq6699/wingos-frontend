import React from 'react'
import ReactApexChart from 'react-apexcharts';

const Bar = () => {
    const chartData = {
        series: [44, 55, 41, 17, 15],
        options: {
            chart: {
                type: 'donut',
            },
            responsive: [
                {
                    breakpoint:320,
                    options: {
                        chart: {
                            width:350,
                            height:400,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    };
    return (
        <>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
            </div>
        </>
    )
}

export default Bar