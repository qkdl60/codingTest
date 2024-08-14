const fs=require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [t, ...list] =fs.readFileSync(filePath).toString().trim().split('\n')

let answer=''
while(list.length){
  const s=list.shift().split('');
  const k=Number(list.shift());
  let [min, max] = [Infinity, 0];
  const map ={};
  s.forEach((a,idx)=>{
      if(map[a]){
          map[a].push(idx);
      }else{
          map[a]=[idx];
      }
  })
  const keys=Object.keys(map);

  const filtered= keys.filter(key=>map[key].length>=k)
  if(filtered.length===0){
      answer+='-1\n';
      continue;
  }
  
  for(const key of filtered){
      const indexArr=map[key];
    
      for(let i =0; i<indexArr.length; i++){
          const a=indexArr[i];
         
          const c=indexArr[i+k-1];
          if(c!==undefined){
              min=Math.min(min, c-a+1);
              max=Math.max(max, c-a+1)
          }
      }
  }
  
  answer+=`${min} ${max}\n`
  
}

console.log(answer)