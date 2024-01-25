/*
도넛 => 크기 n, 정점 n, 간선 n, 다시 원점 회귀
1개 => [0,0];
2개 => [0,1], [1,0];
3개 => [0,1], [1,2], [2,0];
4개 => [0,1], [1,2], [2,3], [3,4]

막대 => 크기 n, 정점 n, 간선 n-1, 회귀x
1개=>간선 x
2개 => [0,1]
3개 => [0,1], [1,2],
4개 => [0,1], [1,2], [2,3] 

8자 => 크기 n, 정점 2n+1, 간선 2n+2, 0이 센터라고 한다면
1개 => [0,1], [1,2], [2,1], [1,0]
2개 => [0,1], [1,2], [2,0], [0,3], [3,4], [4,0]
3개 => [0,1], [1,2], [2,3], [3,0], [0,4], [4,5], [5,6], [6,0] 



무관한 정점 1개 생성, 각 그래프의 임의의 정점 하나로 향하는 간서 생성
그리고 각 정점에 번호 ,
 
간선 정보를 받아서 생성된 정점, 각 그래프 개수

오는 정점이 없다면 생성된 정점, 막대 그래프의 시작점 
막대 그래프는 한곳만 간다. 하지만 생성된 정점은 두곳 이상 간다. 

*/
function solution(edges) {
    const comeGraph=[];
    const goGraph=[];
    for(let edge of edges){
        const [from, to]=edge;
        goGraph[from-1]?goGraph[from-1].push(to-1): goGraph[from-1]=[to-1] ;
        if(goGraph[to-1]===undefined) goGraph[to-1]=[];
        
        comeGraph[to-1]?comeGraph[to-1].push(from-1): comeGraph[to-1]=[from-1] ;
        if(comeGraph[from-1]===undefined) comeGraph[from-1]=[];
        
    }
    let pointIndex;
    let stickCount=0;
    let eightCount=0;
    const exE=[]
    for(let i= 0; i<goGraph.length; i++ ){
        const come=comeGraph[i];
        const go= goGraph[i];
        
        if( come.length===0 && go.length>=2)pointIndex=i;
        if( go.length===0)stickCount++;
        if(go.length===2 && come.length===2)eightCount++;
        if(go.length===2 && come.length===3)exE.push(come)
    }
    console.log(exE)
    const plusE=exE.filter(i=>i.includes(pointIndex)).length
    const dCount=goGraph[pointIndex].length-stickCount-eightCount-plusE;
    return [pointIndex+1,dCount, stickCount, eightCount+plusE]
  
    
    //내가 체크한곳 표시 필요, 진입점을 어디로? 
    //생성된 접점의 오는 곳은 없고, 가는곳이 두곳 이상 
    //막대는 끝 점부터 타고 들어가면 된다. 그러면 goGraph에서 갈곳이 없는 개수가 막대 그래프의 개수, 
    //가는것도 두개, 오는 것도 두개인 접점의 개수 는 8자 그래프의 갯수 ,하지만 생성된 점점이 들어오면 오는개 3개가 될수 있다. 
    // 그외의 만들어진 접점에서 나가는 개수- 두 그래프의 개수 => 도넛
}