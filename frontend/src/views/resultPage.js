import { React, useState, useEffect, useContext } from 'react';
import './resultPage.css';
import DonutCharts from '../components/DonutCharts';
import AuthContext from '../context/AuthContext';
import LineChart from '../components/LineChart';

const data = {
    occupation: {
        time: [1703615257000, 1703716257000, 1703817257000, 1703918257000, 1704019257000, 1704120257000],
        avg: [45, 23, 56, 76, 78, 80],
        score: [34, 54, 33, 23, 67, 78],
    },
    communication: {
        time: [1704115257000, 1704116257000, 1704117257000, 1704118257000, 1704119257000, 1704120257000],
        avg: [34, 54, 33, 23, 67, 78],
        score: [35, 56, 76, 87, 98, 100],
    },
    commonsense: {
        time: [1704115257000, 1704116257000, 1704117257000, 1704118257000, 1704119257000, 1704120257000],
        avg: [35, 56, 76, 87, 98, 100],
        score: [34, 45, 56, 67, 78, 89],
    },
    tools: {
        time: [1704115257000, 1704116257000, 1704117257000, 1704118257000, 1704119257000, 1704120257000],
        avg: [34, 45, 56, 67, 78, 89],
        score: [65, 57, 86, 75, 68, 86], 
    },
    ethic: {
        time: [1704115257000, 1704116257000, 1704117257000, 1704118257000, 1704119257000, 1704120257000],
        avg: [65, 57, 86, 75, 68, 86], 
        score: [45, 23, 56, 76, 78, 80],
    },
}

console.log(new Date().getTime());

const Dashboard = () => {

    const [scoreData, setScoreData] = useState({});
    const { user } = useContext(AuthContext);
    const [cat, setCat] = useState(0);

    useEffect(() => {
        const fetchScore = async () => {
            try {
            const response = await fetch(`http://127.0.0.1:8000/learn/score/`, { // 백엔드 서버에 메시지를 POST 요청
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_no: user.user_no }),
            });

            if (response.ok) {
                const data = await response.json();
                setScoreData(data.result);
                console.log(data.result);
            } else {
                console.error('Failed to fetch score data');
            }
            } catch (error) {
            console.error('Error fetching score data', error);
            }
        };

        if (user) {
            fetchScore();
        }
    }, [user]);

    useEffect(() => {
        console.log(cat);
    }, [cat]);

    return (
        <section className="result_page">
            <div className='result_page_chart'>
                <div className='result_page_donut_chart'>
                    <div className='pentagon'></div>
                    <DonutCharts data={scoreData} backgroundColor={"#758AF9"} setCat={setCat}/>    
                </div>
                <div className='result_page_line_chart'>
                    <LineChart data={data} cat={cat}/>
                </div>
            </div>

            
        </section>

    );
};

export default Dashboard;