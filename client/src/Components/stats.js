import React,{ useState, useEffect } from 'react'
import { useHistory, useParams} from 'react-router-dom'
import { serverurl } from '../config'

import Loading from './loading'
import { Table, Tag } from 'antd';
const Stats = () => {
    const { userid } = useParams()
    const history = useHistory()
    const [details,setdetails] = useState([])

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
                    })}
                </>
            ),
        }
    ];
  

    useEffect(()=>{
        let type;
        
        if(userid[0] ==='s') type='state'
        else type='course'
        let query=userid.slice(1);
        console.log(type," ",query)
        fetch(`${serverurl}/college/${type}`,{
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
    },[]);

    return (
        <div className="college-stats-state-wise">
            <h1 className="header-colleges-stats">Colleges: {userid.slice(1)}</h1>
            <hr/>
            {
                details.length?
                <div><Table scroll={{ x: 700 }} dataSource={details} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {history.push('/college/'+details[rowIndex].id)}
                    };
                }} 
                columns={columnsSimilarClgList} style={{padding:'4%',cursor:'pointer'}}/>;
                </div>
                :<Loading />
            }
        </div>
    )
  }
  
  export default Stats;