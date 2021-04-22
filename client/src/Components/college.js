import React,{ useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { serverurl } from '../config'
import { Table, Tag } from 'antd';
import Loading from './loading'
const Student=()=>{
    const { userid } = useParams();    
    const history = useHistory();
    const [details, setdetails] = useState({});
    const [studetails, setstudetails] = useState([]);
    const [simClg, setsimClg] = useState([]);
    useEffect(()=>{
        fetch(`${serverurl}/college/id/${userid}`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
            setdetails(result)
        }).catch(err=>console.log(err));
    },[userid])
    useEffect(()=>{
        fetch(`${serverurl}/college/similar/${userid}`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
            setsimClg(result)
        }).catch(err=>console.log(err));
    },[userid])
    useEffect(()=>{
        fetch(`${serverurl}/student/clg/${userid}`,{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
            setstudetails(result)
        }).catch(err=>console.log(err));
    },[userid])

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
            sorter: (a, b) => (a.id).localeCompare(b.id),
            sortDirections: ['descend', 'ascend'], 
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
            sorter: (a, b) => (a.branch).localeCompare(b.branch),
            sortDirections: ['descend', 'ascend'], 
            },
        {
            title: 'Skills',
            key: 'skills',
            dataIndex: 'skills',
            render: tags => (
                <>
                    {
                        tags.map(tag => {
                            let color = 'geekblue';
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
            sorter: (a, b) => a.year - b.year,
            sortDirections: ['descend', 'ascend'], 
        },
        {
            title: 'Number of Students',
            dataIndex: 'numberStudents',
            key: 'num',
            sorter: (a, b) => a.numberStudents - b.numberStudents,
            sortDirections: ['descend', 'ascend'], 
        }
    ]

    return (
        <div className="college-details-all">
            <div>
                {details.name?
                <div>
                    <h3>College Profile: {details.name}</h3>
                    <hr/>
                    <div className="college-profile">
                        <table className='table table-hover tb'>
                            <tbody>
                                <tr><td>College ID</td> <td>{details.id}</td> </tr>
                                <tr><td>Number Of Students</td> <td>{details.numberStudents}</td> </tr>
                                <tr><td>Year of Establishment</td> <td>{details.year}</td> </tr>
                                <tr><td>Courses</td> <td> {
                                details.courses?details.courses.map(item=>
                                    <Tag style={{margin: '1px'}} color='#2b3235' key={item}>{item}</Tag>
                                ):""
                            } </td> </tr>
                            </tbody>                            
                        </table>
                    </div>
                </div>
                :
                <Loading />
                }
            </div>
            <h3>Similar Colleges</h3>
            <hr/>
            {
            simClg.length?
            <div>
                <Table scroll={{ x: 700 }} dataSource={simClg} onRow={(record, rowIndex) => {
                return {
                onClick: event => {window.location.assign('/college/'+simClg[rowIndex].id)}
                };
                }} columns={columnsSimilarClgList} style={{padding:'4%',cursor:'pointer'}}/>
            </div>
            :
            <Loading />
            }
            <h3>Students</h3>
            <hr/>
            {
            studetails.length?
            <div>
                <Table scroll={{ x: 700 }} dataSource={studetails} onRow={(record, rowIndex) => {
                return {
                onClick: event => {history.push('/students/'+studetails[rowIndex].id);}
                };
                }} columns={columnsStudentList} style={{padding:'4%',cursor:'pointer'}}/>
            </div>
            :
            <Loading />
            }
        </div>
    )
  }
  
  export default Student;