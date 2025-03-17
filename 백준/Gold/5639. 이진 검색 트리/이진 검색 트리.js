const [rootNode, ...rest] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
/*
https://www.acmicpc.net/problem/5639

n은 높이
*/
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value < this.value) {
      if (this.left) {
        this.left.insert(value);
      } else {
        this.left = new Node(value);
      }
    } else {
      if (this.right) {
        this.right.insert(value);
      } else {
        this.right = new Node(value);
      }
    }
  }
}
const tree = new Node(rootNode);
for (let i = 0; i < rest.length; i++) {
  const value = rest[i];
  tree.insert(value);
}

const answer = [];
const search = (node) => {
  if (node.left) {
    search(node.left);
  }
  if (node.right) {
    search(node.right);
  }
  answer.push(node.value);
};
search(tree);
console.log(answer.join("\n"));
