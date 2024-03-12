function solution(n, left, right) {
const arr= []
for(let i =left; i<=right; i++ ){
    const a = Math.ceil((i+1)/n);
    const b= (i%n)+1;
    arr.push(a>=b ? a:b );
}

return  arr
};
    
