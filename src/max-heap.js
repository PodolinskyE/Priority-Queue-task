const Node = require('./node');




class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	
		
	push(data, priority) {
		var n = new Node(data, priority);
		this.insertNode(n);
		this.shiftNodeUp(n);
		this.heapSize++;
	}
	
	
	
	
	insertNode(node) {
		if(this.isEmpty()){
			this.root = node;
			this.parentNodes.push(node);
		}
		else{
			this.parentNodes.push(node);
			this.parentNodes[0].appendChild(node);
			if(this.parentNodes[0].left && this.parentNodes[0].right) this.parentNodes.shift();
		}
	}

	
	
	
	
	
	shiftNodeUp(node) {
		if(node.parent){
			if(node.priority > node.parent.priority){
				var nIndex = this.parentNodes.indexOf(node);
				var pIndex = this.parentNodes.indexOf(node.parent);
				if(nIndex >= 0 && pIndex >= 0){
					this.parentNodes[nIndex] = node.parent;
					this.parentNodes[pIndex] = node;
				}
				else if (nIndex >= 0){
					this.parentNodes[nIndex] = node.parent;
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}
		else this.root = node;
	}
	
	
	
	
	
	
	

	pop() {
		if(this.isEmpty()) return;
		var oldroot = this.detachRoot();
		this.restoreRootFromLastInsertedNode(oldroot);
		this.shiftNodeDown(this.root);
		this.heapSize--;
		return oldroot.data;
	}
	
	
		
	

	shiftNodeDown(node) {
		if(node && node.left){
			if(node.right && node.right.priority > node.left.priority && node.priority < node.right.priority){
				var nIndex = this.parentNodes.indexOf(node);
				var rIndex = this.parentNodes.indexOf(node.right);
				if(nIndex >= 0 && rIndex >= 0){
					this.parentNodes[nIndex] = node.right;
					this.parentNodes[rIndex] = node;
				}
				else if (rIndex >= 0){
					this.parentNodes[rIndex] = node;
				}
				if(this.root == node) this.root = node.right;
				node.right.swapWithParent();
				this.shiftNodeDown(node);
			}
			else if(node.priority < node.left.priority){
				var nIndex = this.parentNodes.indexOf(node);
				var lIndex = this.parentNodes.indexOf(node.left);
				if(nIndex >= 0 && lIndex >= 0){
					this.parentNodes[nIndex] = node.left;
					this.parentNodes[lIndex] = node;
				}
				else if (lIndex >= 0){
					this.parentNodes[lIndex] = node;
				}
				if(this.root == node) this.root = node.left;
				node.left.swapWithParent();
				this.shiftNodeDown(node);
			}
		}
	}
	
	
	

	
	
	
	detachRoot(){
		var detached = this.root;
		this.root = null;
		var index = this.parentNodes.indexOf(detached);
		if(index >= 0) this.parentNodes.shift();
		if(detached.left) detached.left.parent = null;
		if(detached.right) detached.right.parent = null;
		return detached;
	}

	
	
	
	
	
	restoreRootFromLastInsertedNode(detached){
		if(this.parentNodes.length > 0){
			var lastInserted = this.parentNodes.pop();
			if(lastInserted.parent && lastInserted.parent.right == lastInserted){
				this.parentNodes.unshift(lastInserted.parent);
			}
			if(this.parentNodes.length < 2){
				this.parentNodes.unshift(lastInserted);
			}
			lastInserted.remove();
			if(detached.left && detached.left != lastInserted){
				lastInserted.left = detached.left;
				lastInserted.left.parent = lastInserted;
			}
			if(detached.right && detached.right != lastInserted){
				lastInserted.right = detached.right;
				lastInserted.right.parent = lastInserted;
			}
			this.root = lastInserted;
		}
	}

	
	
	
	
	
	
	size() {
		return this.heapSize;
	}
	
	isEmpty() {
		return !this.root && (this.parentNodes.length == 0);
	}
	
	clear() {
		this.heapSize = 0;
		this.root = null;
		this.parentNodes = [];
	}
}

module.exports = MaxHeap;
