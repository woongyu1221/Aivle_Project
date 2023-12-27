import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import './learnotherPage.css'; 
import LearnNavComponent from '../components/LearnNav';
import Scorebar from "../components/Scorebar";

const scores = {
  occupation: { avg: 75, score: 80 }, // 직무이해 점수
  communication: { avg: 60, score: 90 }, // 커뮤니케이션 점수
  commonsense: { avg: 79, score: 40 }, // 시사/상식 점수
  tools: { avg: 90, score: 80 }, // 도구 점수
  ethic: { avg: 50, score: 70 }, // 윤리 점수
};

const LearningPage = () => {
  const { user } = useContext(AuthContext);

//   if (!user){
//     console.log("redirect");
//     return (<Navigate to='/login'  />)
//   }
  
  return (
    <section id="learn_other">
      {/* <h2>{user.name}</h2> 
      <div className="score-container">
        key 값 넘겨줘야함!!!!!!!!!!!!!!!
        {Object.entries(scores).map(([cat, { avg, score }]) => 
          <Scorebar key={cat} cat={cat} avg={avg} score={score} />
        )}
      </div> */}
      <LearnNavComponent />
      <div id="learn_body">
        <div></div>
        <div></div>
      </div>
    </section>
  )
}

export default LearningPage;
