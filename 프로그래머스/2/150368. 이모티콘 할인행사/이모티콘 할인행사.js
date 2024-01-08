 /*
    우선 순위
    1.서비스 가입자를 최대한 늘리는 것
    2. 이모티콘 판매액을 최대한 늘리는 것
    - 우선 순위라는 것은 1이 같을 때 2을 기준으로 선택
    
    이모티콘 할인율은 10,20,30,40 로 각 이모티콘은 개별적인 할인율을 갖게된다. 
    이모티콘 은 최대 7개, 중복이 허용되는 순열 최대 7**4
    
*/
const getPermutations=(array, length)=>{
    const result =[];
    if(length===1)return array.map(i=>[i]);
    
    for(let i =0; i<array.length; i++){
        const picked=array[i];
        const pre=getPermutations(array, length-1);
        const cur=pre.map(i=> [...i, picked]);
        result.push(...cur);
    }
    return result;
}

const getDiscountPrice=(price, discountRate)=>{
    return Number(price)-(Number(price)*discountRate/100)
}

   
function solution(users, emoticons) {
    //할인율
    const answer=[0,0];
    const discounts=[10,20, 30, 40];
    //할인율이 임티에 적용되는 경우의 수
    const DCPermutations=getPermutations(discounts, emoticons.length);
    DCPermutations.forEach(dc=>{
    //dc는 각 임티에 적용되는 할인율이다.스키마는 {dcRate, price} 할인율, 할인액
    const discounted=emoticons.map((em,index)=>{
        const curDC=Number(dc[index]);
        return {dcRate:curDC, discountedPrice: getDiscountPrice(em,curDC)}
    })
      const result= users.reduce((acc,user)=>{
                const [wantRate,plusPrice]=user;
                let totalPrice=0;
                discounted.forEach(em=>{
                    const {dcRate, discountedPrice}=em;
                    if(dcRate>=wantRate)totalPrice+=discountedPrice;
                })
                if(totalPrice>=plusPrice)return[acc[0]+1, acc[1]];
                else return [acc[0], acc[1]+totalPrice];
            }, [0,0]);
        
            if(answer[0]<result[0]){
                answer[0]=result[0]
                answer[1]=result[1];
            }else if(answer[0]===result[0] && result[1]> answer[1]){
                answer[1]=result[1];
            }
    })
   return answer
    
}