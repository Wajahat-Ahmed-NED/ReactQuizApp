import React, { useEffect, useState } from 'react'
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







    useEffect(() => {
        const getData = () => {
            setLoader(true)
            const api = `https://opentdb.com/api.php?amount=10&category=18&difficulty=${level.length !== 0 ? level.toLowerCase() : ''}&type=multiple`
            axios.get(api).then((res) => {
                const inf = res.data.results
                setInfo(inf)
                setLoader(false)
            })
                .catch((err) => console.log(err))
    
        }
        getData()
    }, [, level])


    const handleSelect = () => {
        setNum(0)
        setMarks(0)
        setNext(1)
        setResult(false)
    }

    const handleClick = (sor) => {

        setNext(next + 1)
        if (next === info.length) {
            setResult(true)
        }

        if (sor === 'ans') {

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


            <div className="container d-flex justify-content-between">
                <div className="container mt-4 mb-2 " style={{ display: 'inline-block' }}>
                    <select id="select" className=" form-select " style={{ width: 'auto' }} onChange={(e) => {
                        setLevel(e.target.value)
                        handleSelect()
                    }} defaultValue={'DEFAULT'}>
                        <option  value="DEFAULT" disabled>Level of difficulty</option>
                        <option >Easy</option>
                        <option  >Medium</option>
                        <option >Hard</option>
                    </select>
                </div>
            </div>


            <h2 style={{ color: 'white' }} className='mt-3'>{level ? level + " Level" : 'Mixed Questions'}</h2>

            {
                loader ? <Spinner /> :

                    <div className="container my-5 p-5 shadow p-3 mb-5 bg-white rounded" style={myStyle}>
                        {
                            result ? <>
                                <h1>You scored {marks}/{info.length} marks</h1>
                                {
                                    marks >= 5 ? <h3>You are Passed</h3> : <h3>Please do more practice (Failed) </h3>
                                }
                            </> :

                                (<>
                                    <h3>Q{num + 1}/{info.length}) &nbsp;&nbsp;&nbsp;
                                        {info[num]?.question}
                                    </h3>
                                    <div className="container my-5 p-3 shadow-lg p-3 mb-5 bg-white rounded" style={myStyle}>
                                        <div className="row">
                                            {
                                                info[num]?.incorrect_answers.map((e, i) => {
                                                    return (
                                                        <div className="col-md-6" >
                                                            <Button className="p-1" variant="contained" key={i} onClick={() => handleClick(i)} style={{ width: '130px', margin: '20px' }}>
                                                                {e}</Button>
                                                        </div>
                                                    )
                                                })

                                            }
                                            <div className="col-md-6">
                                                <Button className="p-1" variant="contained" onClick={() => handleClick('ans')} style={{ width: '130px', margin: '20px' }} key={4}>
                                                    {info[num]?.correct_answer} </Button>
                                            </div>
                                        </div>
                                    </div>

                                </>)
                        }
                        {
                            result ? <button className="btn btn-secondary" onClick={() => {
                                handleSelect()
                            }}> Start Again</button> : ""
                        }
                    </div >

            }
        </>
    )
}
