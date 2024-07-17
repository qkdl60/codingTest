/*
가능한 방이 없다면 새로운 방 생성, 입장(기준 -10, +10 )


*/

const fs= require('fs');
//room={max, min, count, people[]}
const rooms=[]
const filePath =process.platform==='linux'? '/dev/stdin': './input.txt';
const [N, ...s]= fs.readFileSync(filePath).toString().trim().split('\n').map(i=>i.split(' '));
const [n,m]=N.map(Number);
for(const [level, id] of s){
    if(rooms.length===0){
        rooms.push({max:Number(level)+10 ,min:Number(level)-10, count: 1,people:[[level,id]]})
        
    }else{
        let inFlag=false
       for(const room of rooms){
        const {max, min, count, prople}=room;
        if(max>=Number(level) && min<=Number(level) && count<m){
            room.count+=1;
            room.people.push([level, id]);
            inFlag=true;
            break;
        }
       
       }
        if(!inFlag){
            rooms.push({max:Number(level)+10, min:Number(level)-10, count:1, people:[[level, id]]})
        }
           
    }
}
console.log(rooms.reduce((acc,cur)=>{
    acc+=cur.count===m?'Started!\n':'Waiting!\n';
    cur.people.sort((a,b)=>a[1]<b[1]?-1:1);
    for(let [level, id] of cur.people){
        acc+=`${level} ${id }\n`
    }
    return acc;
}, ''))
