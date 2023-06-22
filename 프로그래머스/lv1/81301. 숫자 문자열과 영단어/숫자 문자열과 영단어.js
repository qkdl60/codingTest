function solution(s) {
    const dict = {
        'zero': '0',
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9',
    }
    const words = Object.keys(dict);
    const numbers = Object.values(dict);
    
    const result = [];
    
    let charFlag = -1; // 새 영단어가 시작되는 인덱스
    for (let i = 0; i < s.length; i++) {
        // 숫자인 경우
				if (numbers.includes(s[i])) {
            result.push(s[i]);
            charFlag = -1;
            continue;
        }
				
				// 문자열인 경우
        if (charFlag < 0) {
            charFlag = i;
        }
        const substr = s.substring(charFlag, i + 1);
        if (words.includes(substr)) {
            result.push(dict[substr]);
            charFlag = -1;
        }
    }
    return parseInt(result.join(''));
    
}