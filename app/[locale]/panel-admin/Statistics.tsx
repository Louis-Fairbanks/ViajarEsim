'use client'; // Necessary for client-side rendering in Next.js 13 App Router

import React, { useEffect, useState } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
]

type MonthlySalesData = [
    {
        month: string,
        total_sales: string
    }
]

const Statistics = () => {

    const [monthlySalesData, setMonthlySalesData] = useState<MonthlySalesData>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/orders/ventas/totales')
            if(response.ok){
                const data = await response.json();
                setMonthlySalesData(data.data)
            }
        }
        fetchData();
    }, [])

  const data = {
    labels: monthlySalesData?.map((month) => {
        const truncatedMonth = parseInt(month.month.split('-')[1])
        return months[truncatedMonth - 1]
    }),
    datasets: [
      {
        label: 'Ventas Totales ($USD)',
        data: monthlySalesData?.map((month) => month.total_sales),
        fill: false,
        borderColor: '#6C85FF',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className='w-full max-w-2xl mx-auto px-64 py-32'>
      <Line data={data} options={options} />
    </div>
  );
};

export default Statistics;