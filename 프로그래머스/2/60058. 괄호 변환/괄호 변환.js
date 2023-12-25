/*
p=')('
u=')(' v='' 
"(" v ")"  u=""
return '()'

p='()))((()';
u='()' v='))((()'; u는 올바른 v는 균형 잡힌





*/
//u는 분리되지 않는 '균형잡힌 ', 나머지 v로 만드는 함수 
function separate(p){
    const u=[]
    let right=0;
    let left=0;
    let rest;
    
    for(const [index, a]of p.split('').entries()){
        u.push(a);
        if(a==='(')left++;
        else right++;
        if( left===right ){
            rest=p.slice(index+1);
            break;
        }
    }
    
    return {u:u.join('') , v:rest}
}

function isRight(p){
    const stack=[];
    for(let a of p){
        if(a==='(')stack.push( '(');
        else {
            if(stack.length===0)return false;
            else stack.pop();
        }
    }
    
    return stack.length>0? false: true;
}
function correct(p){
    const {u,v}=separate(p);
    if(isRight(u)){
        
        if(v==='')return u+v;
        else return  u+correct(v);
    }else if(v==='' || isRight(v)){
        const sliced=u.slice(1,-1).split('').map(a=>a==='('?')': '(').join("");
        const rest='('+v+')';
        
        return rest+sliced;
    }else{
        const rest="("+correct(v)+')';
        const sliced=u.slice(1,-1).split('').map(a=>a==='('?')': '(').join("");
        return rest+sliced;  
    }
} 

function solution(p){
    const result =correct(p)
   return result 
}




    