const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
/*
https://www.acmicpc.net/problem/14891

톱니는 n극 s극 중 

회전 중 옆에 톱니의 서로 맞닿은 극이 다르면 반대 방향으로 회전
극이 같다면 회전 x
*/
let gearList = input.slice(0, 4);

const [[n], ...orderList] = input.slice(4).map((v) => v.split(" ").map(Number));

class Gear {
  constructor(toothList) {
    this.list = toothList;
  }
  //숫자로 방향 1 시계, -1 반시계
  rotate(direction) {
    if (direction === 1) {
      this.list.unshift(this.list.pop());
    } else if (direction == -1) {
      this.list.push(this.list.shift());
    }
    return this.list;
  }

  getSide() {
    return [this.list[2], this.list[6]];
  }
}

gearList = gearList.map((gear) => new Gear(gear.split("").map(Number)));
for (const [target, d] of orderList) {
  const targetIdx = target - 1;
  const rotateList = [];
  rotateList[targetIdx] = d;
  let targetList = [targetIdx - 1, targetIdx + 1];

  while (targetList.length) {
    const replace = [];
    for (const t of targetList) {
      const targetGear = gearList[t];
      if (targetGear && t < targetIdx) {
        const [tsr] = targetGear.getSide();
        //기준 왼쪽
        const compareIdx = t + 1;
        const compareGear = gearList[compareIdx];
        const compareRotate = rotateList[compareIdx];
        const [, side] = compareGear.getSide();
        if (tsr !== side) {
          const rotate = compareRotate * -1;
          rotateList[t] = rotate;
        } else {
          rotateList[t] = 0;
        }
        replace.push(t - 1);
      } else if (targetGear && t > targetIdx) {
        const [, tsl] = targetGear.getSide();
        const compareIdx = t - 1;
        const compareGear = gearList[compareIdx];
        const compareRotate = rotateList[compareIdx];
        const [side] = compareGear.getSide();
        if (tsl !== side) {
          const rotate = compareRotate * -1;
          rotateList[t] = rotate;
        } else {
          rotateList[t] = 0;
        }
        replace.push(t + 1);
      }
    }

    targetList = replace;
  }

  for (let i = 0; i < 4; i++) {
    const gear = gearList[i];
    const rotate = rotateList[i];
    gear.rotate(rotate);
  }

  //target을 기준으로 양 옆을 돌려야 한다 .
  // 회전 전에
}

const total = gearList
  .map((gear) => gear.list[0])
  .reduce((acc, cur, index) => {
    if (cur == 1) acc += 2 ** index;
    return acc;
  }, 0);
console.log(total);
