function solution(numbers) {
    numbers.sort((a,b)=>{
        const ab=Number(a.toString()+b.toString());
        const ba=Number(b.toString()+a.toString());
        return ba-ab
    })
    let result= numbers.join("")
    if(Number(result)==0)return "0";
    return result
    }