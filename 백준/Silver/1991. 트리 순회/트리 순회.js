const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [x, ...arr] = fs.readFileSync(filePath).toString().trim().split("\n");
const treeMap=new Map();
arr.forEach(i=>{
    [node,left, right]=i.split(" ");
    treeMap.set(node, [left,right]);
})
let ans="";
function D1(key){
    if(key=="."){
        return;
    }else{
        const [left, right]=treeMap.get(key);
        ans+=key;
        D1(left);
        D1(right);
    }
}
function D2(key){
    if(key==".")return;
    else{
        const [left,right]=treeMap.get(key);
        D2(left);
        ans+=key
        D2(right);
    }
}

function D3(key){
    if(key==".")return;
    else{
        const [left,right]=treeMap.get(key);
        D3(left);
        D3(right);
        ans+=key;
    }
}
D1("A");
ans+="\n"
D2("A")
ans+="\n"
D3("A")

console.log(ans)