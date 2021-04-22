import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {serverurl} from '../config'
import Loading from './loading'
import { Tag } from 'antd';

const Student=()=>{
    const {userid} =useParams()
    const [details,setdetails]=useState({})
    useEffect(()=>{
        fetch(`${serverurl}/student/id/${userid}`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
            setdetails(result)
        }).catch(err=>console.log(err));
    },[])

    return (
        <div className="student-profile-all">
            <div>                
                {details.name?
                <div className="students-profile-body">
                    <div>Student Profile: {details.name}</div>
                    <hr/>
                    <div className="student-profile">
                        <table className='table table-hover tb'>
                            <tbody>
                                <tr><td>Name</td> <td>{details.name}</td> </tr>
                                <tr><td>Roll Number</td> <td>{details.id}</td> </tr>
                                <tr><td>Year of Enrolment</td> <td>{details.year}</td> </tr>
                                <tr><td>Branch</td> <td>{details.branch}</td> </tr>
                                <tr><td>Skills</td> <td> {details.skills?details.skills.map(item=><Tag color='#2b3235' key={item}>{item}</Tag>):""}</td> </tr>
                                <tr><td>College Name</td> <td><Link to={`/college/${details.collegeid.id}`} >{details.collegeid.name}</Link></td> </tr>
                                <tr><td>College ID</td> <td><Link to={`/college/${details.collegeid.id}`} >{details.collegeid.id}</Link></td> </tr>
                                <tr><td>College Address</td> <td><Link to={`/college/${details.collegeid.id}`} >{details.collegeid.city}, {details.collegeid.state}, {details.collegeid.country}</Link></td> </tr>
                            </tbody>                            
                        </table>
                    </div>
                </div>
                :
                <Loading />
                }
            </div>
        </div>
    )
  }
  
  export default Student;