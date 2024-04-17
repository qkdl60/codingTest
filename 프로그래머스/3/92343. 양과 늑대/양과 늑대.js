/*
이진트리=> 트리 만들기?
노드=> 노드 만들기?

루트부터 시작, 모은 양<=늑대의 수 라면 모든 양을 잡아 먹는다. 
최대한 양을 모으고 다시 루트롤 복귀
루트는 항상 양이 있다 .

0은 양, 1은 늑대 


최대 양의 수 => 완탐?=> 
범위가 최대 17이면 
어떻게 탐색? =>  
순서도 영향을 준다 

필요한 정보 
현재 양과 늑대의 수
현재 내가 다음으로 진행 할 수 있는 노드들 , 

해당 node의 타입, 


*/
class Node{
    children=[]
    constructor(type){
        this.type=type
    }
}

function solution(info, edges) {
    const nodes=info.map(i=>new Node(i));
    for(const [parent, children] of edges){
        nodes[parent].children.push(children);
    }
    let max=1; 
    //시작은 nodes[0]부터 
    next ([], nodes[0] ,1, 0, 0 )
    return max
    
    function next (can_go, currentNode, sheep, wolf, depth ){
        const current_go=[...can_go, ...currentNode.children];
    // 우선순위에 따라서 달라질 수도 있는 케이스 잇을 수 있다. 
    // 1번을 갓다가 갓을 때 최대 값이 나오는 0번의 겨ㅇ
        for(const a of current_go){
            const next_node=nodes[a];
            const next_sheep=next_node.type===1? sheep: sheep+1;
            const next_wolf=next_node.type===1? wolf+1: wolf;
            if( next_sheep>next_wolf){
                max=Math.max(max, next_sheep);
                const next_go=new Set([...current_go]);
                next_go.delete(a)
                next(next_go, next_node, next_sheep, next_wolf, depth+1);

            }
            
        }
        
    }
}
