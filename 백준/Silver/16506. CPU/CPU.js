const fs =require('fs');
const filePath=process.platform ==='linux'? '/dev/stdin':'./input.txt';
const [N, ...s]=fs.readFileSync(filePath).toString().trim().split('\n');
const n=Number(N);

const opcodeMap={
    'ADD':"0000",
    "SUB":"0001",
    "MOV":"0010",
    "AND":"0011",
    "OR":"0100", 
    "NOT":'0101',
    "MULT":'0110',
    "LSFTL":'0111',
    "LSFTR":'1000',
    "ASFTR":'1001',
    "RL":'1010',
    "RR":'1011'
}

const answer =[];
for(const l of s){
    const [opcode, rd, ra, bc]=l.split(" ")
    const isC=opcode.endsWith('C');
    const splited=opcode.split('C');
    const bOpcode=opcodeMap[splited[0]]+`${isC?'1':'0'}`;
    const rdBin=Number(rd).toString(2).padStart(3,'0');
    const raBin=Number(ra).toString(2).padStart(3,'0');
    const rbBin=isC?Number(bc).toString(2).padStart(4,'0'):Number(bc).toString(2).padStart(3,'0')+'0'
    answer.push(`${bOpcode}0${rdBin}${raBin}${rbBin}`)
}
console.log(answer.join('\n'))

//1:1 맵핑?, 이진법 변환 NUmber.toString(2)

