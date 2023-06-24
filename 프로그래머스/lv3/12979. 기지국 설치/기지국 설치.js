function solution(n, stations, w) {
    // n 아파트 수 , stations 기지국 설치 번호, w 전파 거리 (전체 전파거리는 2*W+1 );
    // 스타트와 엔드를 보고 전파가 없는 곳을 찾을 수 있을 것 같다. 
    const wRange=(2*w)+1; 
    
    let s=0;
    let e=0;
    const noTel=[];
    stations.forEach((v)=> {
        e=v-1-w;
        if(e-s>0)noTel.push(e-s);
        
        s=v-1+w+1;
    })
    e=n
    if(s<n)noTel.push(e-s)
    let count =0;
    for(let a of noTel){
        count+=Math.ceil(a/wRange);
    }
    return count

}