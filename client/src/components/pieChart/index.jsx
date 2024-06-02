import React, { useState, useEffect, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';
import './index.scss';

const MyPieChart = ({ products }) => {
    const [helmetCount, setHelmetCount] = useState(0);
    const [accessoryCount, setAccessoryCount] = useState(0);
    const [bikeCount, setBikeCount] = useState(0);

    useEffect(() => {
        let newHelmetCount = 0;
        let newAccessoryCount = 0;
        let newBikeCount = 0;

        products.forEach((element) => {
            if (element.category.toLowerCase() === 'helmet') {
                newHelmetCount++;
            } else if (element.category.toLowerCase() === 'bike') {
                newBikeCount++;
            } else if (element.category.toLowerCase() === 'accessory') {
                newAccessoryCount++;
            }
        });

        setHelmetCount(newHelmetCount);
        setBikeCount(newBikeCount);
        setAccessoryCount(newAccessoryCount);
    }, [products]);

    const chartRef = useRef(null);

    const data = useMemo(
        () => ({
            labels: ['Bike', 'Helmet', 'Accessory'],
            color: "white",
            datasets: [
                {
                    label: 'Product Count',
                    data: [bikeCount, helmetCount, accessoryCount],
                    backgroundColor: [
                        'rgb(160, 104, 0)',
                        'rgb(0, 160, 3)',
                        'rgb(54, 162, 235)',
                    ],
                    hoverOffset: 30,
                },
            ],
        }),
        [bikeCount, helmetCount, accessoryCount]
    );

    useEffect(() => {
        const ctx = document.getElementById('myChart');

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: data,
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return (
        <section className="adminMain">
            <h3>STATISTICS OF THE TYPES OF PRODUCTS IN TOPBIKE SERVICE</h3>
            <div className="pie-chart">
                <canvas id="myChart"></canvas>
            </div>
        </section>
    );
};

export default MyPieChart;
