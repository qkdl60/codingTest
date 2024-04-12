/*
우선 순위 큐 구현하듯 
y 기준으로 내림 차순 하고 
순서대로 insert
root 가 없으면 root로 설정 

insert 후 비교 
current 와 비교 해서 insert 값의 x가 작다면 left로 
크다면 right로 
비어있다면 그 자리에 넣기, node가 있다면 다시 비교 
*/
class Node{
    constructor(n,p){
        this.num=n;
        this.p=p;
        this.left=null;
        this.right=null;
    }
}

class Tree{
    constructor(){
        this.root=null;    
    
    }
    insert(node){
        if(this.root===null){
            this.root=node;
            return;
        }
        let current=this.root;
        while(current){
            if(current.p[0]>node.p[0]){
                if(current.left===null){
                    current.left=node;
                    return;
                }
                current=current.left;
                continue;
            }
            if(current.p[0] <node.p[0]){
                if(current.right===null){
                    current.right=node;
                    return;
                }
                current=current.right;
                continue;
            }
        }
        return;
    }
    
}
function preSearching(array, current){
    if(current===null)return; 
    array.push(current.num);
    if(current.left!==null)preSearching(array,current.left);
    if(current.right!==null)preSearching(array,current.right);
}

function postSearching(array,current){
    if(current===null)return; 
    if(current.left!==null)postSearching(array,current.left);
    if(current.right!==null)postSearching(array,current.right);
    array.push(current.num);
}

function solution(nodeinfo) {
  const nodes=nodeinfo.map((node, index)=>({num:index+1, p: node ,  })).sort((a,b)=>{
    if(b.p[1]===a.p[1])return a.p[0]-b.p[0];
    return b.p[1]-a.p[1];
  })
  const tree=new Tree();
  nodes.forEach(i=>{
      const node=new Node(i.num, i.p);
      tree.insert(node);
  })
    const pre=[]
    const post=[]
    preSearching(pre, tree.root);
    postSearching(post, tree.root);
    return [pre,post]
 
}




