import React,{ useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {serverurl} from '../config'
import { Chart } from "react-google-charts";
import Loading from './loading'

import { Table, Tag } from 'antd';
const Dashboard=()=>{
    const history=useHistory()
    const [statecollege,setstatecollege]=useState([]);
    const [coursecollege,setCoursecollege]=useState([]);
    const [details,setdetails]=useState([])
  
    const columnsSimilarClgList = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',  
            sorter: (a, b) => (a.name).localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],      
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            sorter: (a, b) => (a.city).localeCompare(b.city),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            sorter: (a, b) => (a.state).localeCompare(b.state),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            sorter: (a, b) => a.year < b.year,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Number of Students',
            dataIndex: 'numberStudents',
            key: 'num',
            sorter: (a, b) => a.numberStudents < b.numberStudents,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Courses',
            key: 'courses',
            dataIndex: 'courses',
            render: tags => (
                <>
                    {
                        tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })
                    }
                </>
            ),
        }
    ]
    
  
    useEffect(()=>{
        fetch(`${serverurl}/college/list`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
            setdetails(result)
        }).catch(err=>console.log(err));
    },[]);
    useEffect(()=>{
        fetch(`${serverurl}/collegestate`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
            result.unshift(['state','count'])
            setstatecollege(result)
        }).catch(err=>console.log(err));
    },[]);
    useEffect(()=>{
        fetch(`${serverurl}/collegecourse`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
          result.unshift(['state','No. of Colleges'])
          setCoursecollege(result)
        }).catch(err=>console.log(err));
    },[]);

    return (
        <div className="dashboard">
            <h3>Dashboard</h3>
            <hr/>
            <div className='dashboard-charts container'>
                <div className='row'>
                    <div>
                        {
                            statecollege.length?
                            <Chart
                                chartType="PieChart"
                                data={statecollege}
                                chartEvents={[
                                {
                                    eventName: "select",
                                    callback({ chartWrapper }) {
                                        history.push('/cstat/s'+statecollege[chartWrapper.getChart().getSelection()[0].row+1][0]);
                                    }
                                }
                                ]} 
                                options={{
                                    title: 'Colleges by States',
                                    pieHole: 0.4,
                                }}
                                width={"100%"}
                                height={"400px"} legendToggle
                            />:
                            <Loading />
                        }
                    </div>
                    <div>
                        {
                            coursecollege.length?
                            <Chart
                                chartType="PieChart"
                                data={coursecollege}
                                chartEvents={[
                                {
                                    eventName: "select",
                                    callback({ chartWrapper }) {
                                        history.push('/cstat/c'+coursecollege[chartWrapper.getChart().getSelection()[0].row+1][0]);
                                        console.log(chartWrapper.getChart().getSelection()[0].row)
                                    }
                                }
                                ]} 
                                options={{
                                    title: 'Colleges by Courses',
                                    pieHole: 0.4,
                                }}
                                width={"100%"}
                                height={"400px"} legendToggle
                            />:
                            <Loading />
                        }
                    </div>
                </div>
            </div>
            <div className="dashboard-college-list">
                <h3>Colleges</h3>
                <hr/>
                {
                    details.length?
                    <div>
                        <Table scroll={{ x: 700 }} dataSource={details} onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {history.push('/college/'+details[rowIndex].id)}
                            };
                        }} 
                        columns={columnsSimilarClgList} style={{padding:'4%',cursor:'pointer'}}/>;
                    </div>
                    :
                    <Loading />
                }
            </div>
        </div>
    )
  }
  
  export default Dashboard;