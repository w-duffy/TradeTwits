import React, {useState, useEffect} from 'react';
// import { useDispatch, useSelector } from "react-redux";
import './portfoliograph.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

function Graph({pClose, high, low, openP,  current}){
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

      const [lineColor, setLineColor] = useState("")
      //for the slice make the second number a variable that will change with a useEffect when the user clicks how many days to view.
      // const daySlicer = dates.slice(0, 30)
      const daySlicer = ["Previous Close", "Open", 'Current']
      // const daySlicer = ["Previous Close", "High", "Low", "Open", 'Current']
      const valuesSlicer = [pClose,  openP,  current]
      // const valuesSlicer = [pClose, high, low, openP,  current]
      // const valuesSlicer = values.slice(0, 30)

      useEffect(() =>{
        if(valuesSlicer[0] < valuesSlicer[valuesSlicer.length - 1]){
          setLineColor('rgb(50, 190, 50)')
        }
        if(valuesSlicer[0] > valuesSlicer[valuesSlicer.length - 1]) {
           setLineColor('rgb(255, 0, 0)')
        }
      },[])

      const data = {
        labels: daySlicer,
        datasets: [
          {
            label: 'Value',
            data: valuesSlicer,
            fill: true,
            backgroundColor: 'rgb(0, 0, 0)',
            borderColor: lineColor,
            borderWidth: '1.5',
          },
        ],
      };

      const options = {
        scales: {
          xAxes: {
            grid: {
              display: false,
            },
            gridLines: {
              display: true,
              color: 'rgb(255,255,255)',
            },
            ticks: {
              display: false
            }
          },
          yAxes:
            {
              grid: {
                display: false,
              },
              gridLines: {
                display: true,
                color: 'rgb(255,255,255)',
             },
              ticks: {
                display: false,
                beginAtZero: true,
              },
            },
        },
        elements: {
          point:{
              radius: 0
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: false
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      };
    return (

             <Line options={options} data={data}/>

    )
}

export default Graph
