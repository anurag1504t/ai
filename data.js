
async function datacollege(){
    const cstate=['Madhya Pradesh','Karnataka','Bihar','Gujarat','Uttar Pradesh','Haryana', 'West Bengal'];
    const ccity=[['Ujjain','Gwalior','Jabalpur'],['Bengaluru','Mangaluru','Maysuru'],['Patna','Darbhanga','Gaya'],['Surat','Ahmedabad','Vadodara'],['Prayagraj','Lucknow','Varanasi'],['Gurugram','Hisar','Faridabad'], ['Kolkata', 'Siliguri', 'kharagpur']];
    const ccourses=['Computer Science and Engineering','Electronics and Communication Engineering','Mechanical Engineering','Civil Engineering','Mining Engineering']
    arr=[]
    for(i=1;i<=100;i++){
    
    cname='College'+(i<10?'0'+i:i);
    id='Cid'+(i<10?'0'+i:i);
    year=Math.floor(Math.random()*40+1980);
    b=Math.floor(Math.random()*5)+2;
    courses=ccourses.slice(0,b);
    a=Math.floor(Math.random()*7);
    aa=Math.floor(Math.random()*3);
    city=ccity[a][aa];
    state=cstate[a];
    country='India';
    numberStudents=0;
    aob=new college({
        name:cname,id,city,state,country,year,numberStudents,courses
    })
    //arr.push(aob);
    await aob.save()
    .then(a=>console.log('saved '+i+'\n'))
    .catch(a=>console.log('error '+i+a+'\n'));
    console.log(a+" "+aa+" "+city+'\n');
    }
    
    college.find({})
    .sort('name')
    .then(a=>{
        a.map(item=>{
            console.log(item.name+'\n');
        })
    })    
}

async function datastudent(){
    sskills=['JavaScript','C++','React','Node','Express','MongoDB','Heroku','PYTHON','AWS','CSS','HTML'];
    for(i=1;i<=100;i++){
        cname='College'+(i<10?'0'+i:i);
        await college.findOne({name:cname})
        .then(async function(data){
            n=data.courses.length;
            courses=data.courses;
            studentsum=0;
            arr=[];
            for(j=0;j<n;j++){
                nstu=Math.floor(Math.random()*10+50);
                studentsum+=nstu;
                for(k=0;k<nstu;k++){
                    name='Student'+k;
                    year=Math.floor(Math.random()*4)+2020;
                    id='Stu'+k+'clg'+i+'br'+j;
                    branch=courses[j];
                    collegeid=data._id;
                    a=Math.floor(Math.random()*10);
                    b=Math.min(a+3,10);
                    skills=sskills.slice(a,b);

                     s=new student({
                        name,id,branch,year,collegeid,skills
                    })
                    arr.push(s);

                }
            }
            await student.insertMany(arr)
            .then(a=>console.log('saved'))
            .catch(a=>console.log("error "+a+'\n'));

            data.numberStudents=studentsum;
           await data.save()
            .then(a=>console.log("data saved "+i+'\n'))
            .catch(a=>console.log('error'+a+'\n'))

        })



    }
    
}