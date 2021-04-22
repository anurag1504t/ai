import React,{ useState,useEffect } from 'react'
import { useHistory,useParams} from 'react-router-dom'
import {serverurl} from '../config'

import Loading from './loading'
import { Table, Tag } from 'antd';
const StatsStudents=()=>{
    const {userid} =useParams()
    const history=useHistory();
    const [details,setdetails]=useState([])
    useEffect(()=>{
        let type;
        if(userid[0] ==='s') type='state'
        else type='course'
        let query=userid.slice(1);
        fetch(`${serverurl}/student/${type}`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({query})
        })
        .then(res=>res.json())
        .then(result=>{
            setdetails(result)
        }).catch(err=>console.log(err));
    },[])

    const columnsStudentList = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => (a.name).localeCompare(b.name),
            sortDirections: ['descend', 'ascend'], 
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            sorter: (a, b) => a.year - b.year,
            sortDirections: ['descend', 'ascend'], 
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
        },
        {
            title: 'College',
            key: 'collegeid',
            dataIndex: 'collegeid',
            render: tags => (
                <>
                    {tags.name}, {tags.city}, {tags.state}
                </>
            ),
        },
        {
            title: 'Skills',
            key: 'skills',
            dataIndex: 'skills',
            render: tags => (
                <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                    color = 'volcano';
                    }
                    return (
                    <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                    </Tag>
                    );
                })}
                </>
            ),
        }
    ]

    return (
        <div className="students-branch-wise">
            <h1>{userid.slice(1)} Students</h1>
            {
                details.length?
                <div>
                    <Table scroll={{ x: 700 }} dataSource={details} onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {history.push('/students/'+details[rowIndex].id)}
                        };
                    }} 
                    columns={columnsStudentList} style={{padding:'4%',cursor:'pointer'}}/>;
                </div>
                :<Loading />
            }
        </div>
    )
  }
  
  export default StatsStudents;