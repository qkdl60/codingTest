const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const s= fs.readFileSync(filePath).toString().trim()
const Xlist =s.split(".").filter(i=>i!=='');
let flag=false;
Xlist.forEach(i=>{
    if(i.length%2===1){
        flag=true;
        return;
    }
})
if(flag){
    console.log(-1)
    return; 
}
const Dlist =s.split('X').filter(i=>i!=='');

const converted=Xlist.map(i=>{
    if(i.length%4===0){
        return "A".repeat(i.length);
    }else{
        const f=Math.floor( i.length/4);
        return 'AAAA'.repeat(f)+"BB"
    }
})
let answer=''
if(s.indexOf(".")===0){
    
    for(let i= 0; i<Dlist.length; i++){
        answer+=(Dlist[i]+(converted[i]? converted[i]: ''))
    }
   
}else{
    for(let i=0; i<Xlist.length; i++){
    
    answer+=(converted[i]+(Dlist[i]?Dlist[i]: ''))
}

}
console.log(answer)

