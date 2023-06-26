
//이 방법으로 한다면  10
function isPrime(num){
    let i=2;
    let n=num/2;
    while(i<=n){
        if(num%i===0)return false;
        i++;
    }
    return true;
}

function solution(nums) {
    //3중 for 문 10만 정도
    let count=0;
    for(let i =0 ; i<nums.length; i++){
        for(let j =i+1; j<nums.length; j++){
            for(let k=j+1; k<nums.length; k++){
                const sum=nums[i]+nums[j]+nums[k];
                if(isPrime(sum))count++;
            }   
        }
    }
    return count
}