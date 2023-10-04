1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
function solution(scoville, K) {
    scoville.sort((a,b)=> b - a) 
    let cnt = 0 ;
    let under_K = []
    let flag = 0 // 다 합쳐서 K보다 큰지 안큰지 판별 0이면 안큰거 1이면 큰거

    for(let i = 0 ; i < scoville.length ; ++i){
        if(scoville[i] < K){
            under_K.push(scoville[i])
        }
        else{
            flag = 1
        }
    }    
   // console.log(under_K)
    let mixed = []
    let m_i = 0
    let i = 0
    let n1 = 0 
    let n2 = 0
    while(1){
       // console.log(mixed, n1 , n2)
        if(mixed[m_i] != undefined ){
            if(under_K.length != 0){
                if(under_K.at(-1) < mixed[m_i]){
                    n1 = under_K.pop()
                }
                else{
                    n1 = mixed[m_i]
                    ++m_i
                }
            }
            else{
                n1 = mixed[m_i]
                ++m_i
            }
        }
        else{
            if(under_K.length != 0){
                n1 = under_K.pop()
            }
            else{
                break;
            }
        }
        if(mixed[m_i] != undefined ){
            if(under_K.length != 0){
                if(under_K.at(-1) < mixed[m_i]){
                    n2 = under_K.pop()
                }
                else{
                    n2 = mixed[m_i]
                    ++m_i
                }
            }
            else{
                n2 = mixed[m_i]
                ++m_i
            }
        }
        else{
            if(under_K.length != 0){
                n2 = under_K.pop()
            }
            else{
                ++cnt
                break;
            }
        }

        if(n1+n2*2 < K){
            mixed.push(n1+n2*2)
        }
        else{
            flag = 1 
        }
       ++cnt
    }
    //if(mixed != [])
    /*
    가진 음식 스코빌을 하나씩 지우고 
    새로운 음식 스코빌을 하나씩 추가해서 arr에 K보다 작으면 저장하기
    두개의 배열을 다르게 유지해서 
    가진읍식과 새로운 음식중 작은 것들 부터 먼저 n1,n2로 만든다
    가진음식, 새로운 음식의 index가 합쳐서 1이라면 return 하기 그리고  flag ==1 이라면 ++cnt 해주고 끝내기 flag == 0 이라면 -1로 끝내기 
    */
    if(flag == 1){
        return cnt 
    }
    else{

        return -1
    }
}