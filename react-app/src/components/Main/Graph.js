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


    //   let date1 = new Date(new Date().setDate(new Date().getDate() - 1))
    //   let date2 = new Date(new Date().setDate(new Date().getDate() - 2))
    //   let date3 = new Date(new Date().setDate(new Date().getDate() - 3))
    //   let date4 = new Date(new Date().setDate(new Date().getDate() - 4))
    //   let date5 = new Date(new Date().setDate(new Date().getDate() - 5))


        //  values = [4592.23, 4668.22, 4700.68, 4862.325, 4768.89]
        //  dates = [date5.toLocaleDateString("en-US"), date4.toLocaleDateString("en-US"), date3.toLocaleDateString("en-US"), date2.toLocaleDateString("en-US"), date1.toLocaleDateString("en-US")]


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
