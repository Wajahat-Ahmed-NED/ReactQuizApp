import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import './Body.css'
import Spinner from './spinner';

export default function Body() {
    const [num, setNum] = useState(0)
    const [marks, setMarks] = useState(0)
    const [next, setNext] = useState(1)
    const [result, setResult] = useState(false)
    const [level, setLevel] = useState('')
    const [info, setInfo] = useState([])
    const [loader, setLoader] = useState(false)




    const getData = () => {
        setLoader(true)
        const api = `https://opentdb.com/api.php?amount=10&category=18&difficulty=${level.length!==0?level.toLowerCase():''}&type=multiple`
        axios.get(api).then((res) => {
            const inf = res.data.results
            console.log(inf)
            setInfo(inf)
            setLoader(false)
            
        })
            .catch((err) => console.log(err))

    }

    useEffect(() => {
        

        getData()
        
    }, [ ,level])



    const handleClick = (sor) => {
        // let a=e.target.value
        // console.log(a)
        setNext(next + 1)
        if (next === info.length) {
            setResult(true)
        }
        // let a = info[num].correct_answer
        // console.log(questions[num].ans.indexOf(a))
        // if (questions[num].correctAns===)
        // let cor = info[num].incorrect_answers[sor]
        if (sor === 'ans') {
            // alert("correct")
            let newMarks = marks + 1;
            setMarks(newMarks)
        }
        let no = num + 1;
        setNum(no)

    }
    let myStyle = {
        border: '1px solid black',
        backgroundColor: 'beige',
        borderRadius: '20px',


    }
    return (
        <>

            <div className="container my-2 ">
               
                <select id="select"  className=" form-select " style={{width:'auto'}} onChange={(e)=>setLevel(e.target.value)}>
                    <option value="">Level of difficulty</option>
                    <option >Easy</option>
                    <option selected >Medium</option>
                    <option >Hard</option>
                    
                </select>
                <h2 style={{color:'white'}}>{level?level+" Level" : 'Mixed Questions'}</h2>

            </div>


        {
            loader ?<Spinner/>:
        
            <div className="container my-5 p-5 shadow p-3 mb-5 bg-white rounded" style={myStyle}>
                {
                    result ? <>
                        <h1>You scored {marks}/{info.length} marks</h1> </> :

                        (<>
                            <h3>Q{num + 1}) &nbsp;&nbsp;&nbsp;
                                {info[num]?.question}
                            </h3>
                            <div className="container my-5 p-3 shadow-lg p-3 mb-5 bg-white rounded" style={myStyle}>
                                <div className="row">
                                    {
                                        info[num]?.incorrect_answers.map((e, i) => {
                                            return (
                                                <div className="col-md-6" >
                                                    <Button key={i} onClick={() => handleClick(i)} variant="contained" style={{ width: '400px', margin: '20px' }}>
                                                        {e}</Button>
                                                </div>
                                            )
                                        })

                                    }
                                    <div className="col-md-6">
                                        <Button onClick={() => handleClick('ans')} variant="contained" style={{ width: '400px', margin: '20px' }}>
                                            {info[num]?.correct_answer} </Button>
                                    </div>
                                </div>
                            </div>
                        </>)
                }
                {
                    result ? <button className="btn btn-secondary" onClick={() => {
                        window.location.reload()
                    }}> Start Again</button> : ""
                }
            </div >
            
            }
        </>
    )
}
