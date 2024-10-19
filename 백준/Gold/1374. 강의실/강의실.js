class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}
class Heap {
  constructor() {
    this.heap = [null];
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  push(node) {
    this.heap.push(node);

    let current = this.heap.length - 1;
    let parent = Math.floor(current / 2);
    while (parent !== 0 && this.heap[parent].priority > node.priority) {
      this.swap(parent, current);
      current = parent;
      parent = Math.floor(current / 2);
    }
  }

  pop() {
    if (this.heap.length === 1) return null;
    if (this.heap.length === 2) return this.heap.pop();

    const returnValue = this.heap[1];

    this.heap[1] = this.heap.pop();

    let current = 1;
    let left = 2;
    let right = 3;
    while (
      (this.heap[left] && this.heap[current].priority > this.heap[left].priority) ||
      (this.heap[right] && this.heap[current].priority > this.heap[right].priority)
    ) {
      if (!this.heap[right] || this.heap[right].priority > this.heap[left].priority) {
        this.swap(current, left);
        current = left;
      } else {
        this.swap(current, right);
        current = right;
      }
      left = current * 2;
      right = left + 1;
    }
    return returnValue.value;
  }

  top() {
    return this.heap[1];
  }

  isEmpty() {
    return this.heap.length === 1;
  }
}

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n], ...list] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" ").map(Number));

/*
https://www.acmicpc.net/problem/1374
강의 번호, 시작 시간, 종료 시간

*/
list.sort((a, b) => {
  if (b[1] === a[1]) return a[2] - b[2];
  return a[1] - b[1];
});
const heap = new Heap();
let count = 0;
list.forEach((v) => {
  const [courseIndex, startTime, endTime] = v;
  if (heap.isEmpty()) {
    count++;
    const node = new Node(v, endTime);
    heap.push(node);
  } else {
    const top = heap.top();
    if (top.priority <= startTime) {
      heap.pop();
      const node = new Node(v, endTime);
      heap.push(node);
    } else {
      count += 1;
      const node = new Node(v, endTime);
      heap.push(node);
    }
  }
});
console.log(count);
