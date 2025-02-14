import { useEffect, useState, useRef } from 'react'; 
import './App.css';
import api from './api';

function App() {
  const [question, setQuestion] = useState<{ question: string, options: string[], answer: string } | null>(null);
  const [qId, setqID] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrong, setWrong] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const hasFetched = useRef(false);

  const GetQuestion = async () => {
    setError(null);
    try {
      const response = await api.get("/question");
      if (response.status === 200) {
        setQuestion(response.data.question);
        setqID(response.data.q_id);
        setMessage(response.data.message);
        setCorrectCount(response.data.correct);
        setCount(response.data.count);
        setWrong(response.data.wrong);
      }
    } catch (error: any) {
      console.error(error);
      setError("Error: Couldnt get question");
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      GetQuestion();
    }
  }, []);

  const Check = async (qId: number) => {
    setError(null);
    if(userGuess===""){
      setError("Select a choice")
      return
    }
    setError(null);
    setFlag(true);
    try {
      const response = await api.post(`/check/${qId}?ans=${userGuess}`);
      if (response.status === 200) {
        setResult(response.data.result);
      }
    } catch (error: any) {
      console.error(error);
      setError("Error:Couldn't check");
    }
  };

  const NextQuestion = async () => {
    setResult("");
    setUserGuess("");
    setFlag(false);
    setQuestion(null);
    await GetQuestion();
  };

  return (
    <div className='px-5 flex flex-col min-h-screen overflow-hidden bg-violet-100'>
      <h1 className='text-center text-7xl pt-5'>Quiz Game</h1>
      {<p className='text-center font-bold mt-20 text-3xl border rounded-lg py-2 bg-amber-200'>{message || question?.question}</p>}
      {message === "Quiz over" ? "" : (<div className='flex-grow' />)}
      <div className='grid grid-cols-2 gap-4 font-semibold'>
        {question?.options.map((option, index) => (
          <button
            key={index}
            className={`p-4 bg-blue-500 text-white cursor-pointer text-lg rounded-lg hover:bg-blue-700 transition ${userGuess === option ? "border-4 border-black" : ""} ${result === "correct" && userGuess === question.answer && userGuess === option ? "bg-green-500" : ""} ${flag === true && result === "incorrect" && userGuess === option ? "bg-red-500" : ""} ${flag === true && option === question.answer ? "bg-green-500" : ""}`}
            onClick={() => !flag && setUserGuess(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {message === "Quiz over" ? (
        <div className='border rounded-lg py-1 mt-20 flex justify-between text-xl bg-teal-200'>
          <p className='text-center font-semibold ml-5'>Total Questions: {count}</p>
          <p className='text-center font-semibold'>Questions answered correctly: <span className='text-green-700 font-bold'>{correctCount}</span></p>
          <p className='text-center font-semibold mr-5'>Questions answered wrong: <span className='text-red-500'>{wrong}</span></p>
        </div>
      ) : (
        <div className={`${error ? "mb-4":"mb-15"} `}>
          <div className='mt-10 flex justify-between'>
            <div className='w-full' />
            <div className={`w-full flex justify-center`}><button className='border-2 px-2 py-1 rounded-lg cursor-pointer bg-emerald-200 text-lg font-semibold' onClick={() => Check(qId)} disabled={flag}>Confirm</button></div>
            <div className='w-full flex justify-center'><button className='border-2 px-2 py-1 rounded-lg cursor-pointer bg-emerald-200 text-lg font-semibold' hidden={!flag} onClick={NextQuestion}>Next Question</button></div>
          </div>
          <div>{error && (<p className='text-center mt-5 text-lg text-red-500 font-semibold'>{error}</p>)}</div>
        </div>
      )}
    </div>
  );
}

export default App;
