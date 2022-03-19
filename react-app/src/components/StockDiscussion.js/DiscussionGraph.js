import React, {useState, useEffect} from 'react';
// import { useDispatch, useSelector } from "react-redux";
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

function DiscussionGraph({values, dates, cp, time}){
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
        // values.push(cp)
        // const formatDays = dates.map(day =>{
        //   return day.slice(5)
        // })
        // formatDays.push(time)
      const [lineColor, setLineColor] = useState("")
      //for the slice make the second number a variable that will change with a useEffect when the user clicks how many days to view.
      const daySlicer = dates.slice(0, 5)
      const valuesSlicer = values.slice(0, 5)
        valuesSlicer.unshift(cp)
        daySlicer.unshift(time)
      useEffect(() =>{
        if(valuesSlicer[valuesSlicer.length - 1] > valuesSlicer[valuesSlicer.length - 2]){
          setLineColor('rgb(50, 190, 50)')
        }

        if(valuesSlicer[valuesSlicer.length - 1] < valuesSlicer[valuesSlicer.length - 2]) {
           setLineColor('rgb(255, 0, 0)')
        }
        if(valuesSlicer[valuesSlicer.length - 1] === valuesSlicer[valuesSlicer.length - 2]){
          setLineColor('rgb(50, 190, 50)')
        }
      },[values])

      const data = {
        labels: daySlicer.reverse(),
        datasets: [
          {
            label: 'Value',
            data: valuesSlicer.reverse(),
            fill: false,
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
              display: true,
            },
            gridLines: {
              display: true,
              color: 'rgb(255,255,255)',
            },
            ticks: {
              display: true
            }
          },
          yAxes:
            {
              grid: {
                display: true,
              },
              gridLines: {
                display: true,
                color: 'rgb(255,255,255)',
             },
              ticks: {
                display: true,
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
            display: true
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      };
    return (

             <Line key={data[0]} options={options} data={data}/>

    )
}

export default DiscussionGraph
