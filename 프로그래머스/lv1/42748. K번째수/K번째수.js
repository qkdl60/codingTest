function solution(array, commands) {
    //w
    let answer=commands.map(([x,y,z])=>{
        let a=[...array].slice(x-1,y).sort((i,j)=>i-j)
        return a[z-1]
    });
    
    return answer;
}