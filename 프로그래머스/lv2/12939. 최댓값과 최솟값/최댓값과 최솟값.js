function solution(s) {
//     s=s.split(" ").map(i=>+i);
    
//     return `${Math.min(...s)} ${Math.max(...s)}`;
 
    
      const arr = s.split(' ');

    return Math.min(...arr)+' '+Math.max(...arr);
}