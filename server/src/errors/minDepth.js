class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function preorder(node) {
  if (node === null) return;
  console.log(node.val);
  preorder(node.left);
  preorder(node.right);
}

function postOrder(node) {
  if (node === null) return;
  postOrder(node.left);
  postOrder(node.right);
  console.log(node.val);
}
let root = new TreeNode("A");
root.left = new TreeNode("B");
root.right = new TreeNode("C");
root.left.left = new TreeNode("D");
root.left.right = new TreeNode("E");

// preorder(root);
// postOrder(root);

// postInOrder(root);

// function postInOrder(node) {
//   if (node === null) return;
//   postInOrder(node.left);
//   postInOrder(node.right);
//   console.log(node.val);
// }

function Bfs(root) {
  if (root === null) return;
  let queue = [];
  queue.push(root);
  while (queue.length) {
    let node = queue.shift();

    console.log(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}

function MinDepth(root) {
  if (root === null) return 0;

  if (root.left === null) return 1 + MinDepth(root.right);
  if (root.right === null) return 1 + MinDepth(root.left);

  return 1 + Math.min(MinDepth(root.left), MinDepth(root.right));
}

console.log(Bfs(root));
console.log(MinDepth(root), "in the min Depth");

function levelOrder(root) {
  if (root === null) return;
  let queue = [];
  queue.push(root);
  while (queue.length) {
    let node = queue.shift();
    console.log(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}

function klevelOrderPrint(root) {
  if (root === null) return;

  klevelOrderPrint(root.left);
  console.log(root.val);
  klevelOrderPrint(root.right);
}

console.log(levelOrder(root), "in the level order");
