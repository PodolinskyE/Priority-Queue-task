const MaxHeap = require('./max-heap.js');



class PriorityQueue {
	
	
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	
	
	push(data, priority) {
		if(this.heap.size() == this.maxSize)
			throw new Error("The size of Queue reached to max");
		this.heap.push(data, priority);
	}

	
	
	
	shift() {
		if(this.heap.size() == 0) throw new Error("Queue is empty");
		var res = this.heap.pop();
		return res;
	}
	

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;































