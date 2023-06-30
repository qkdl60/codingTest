function checkPriority(num){
    num=Number(num)
    if(num<=1)return false;
    if(num==2 || num==3 || num ==5 || num==7)return true;
    for(let i=2; i*i<=num; i++){
        if(num%i==0){
            return false;
        }
    }
    return true
}
function solution(numbers) {
    let count=0;
    numbers=numbers.split("");
    const visited=Array.from({length:numbers.length}, ()=>0);
    const numSet=new Set();
    numSet.add(0);
    
    function DFS(n){
        if(n.length>numbers.length)return;
        else{
            console.log(n)
            if(checkPriority(n))count++;
            for(let i =0; i<numbers.length; i++){
                let next=n+numbers[i];
                next=Number(next);
                if(visited[i]==0 && !numSet.has(next)){
                    visited[i]=1;
                    numSet.add(next);
                    DFS(next);
                    visited[i]=0;
                }
            }
        }
    }
    DFS("")
    return count
   
}