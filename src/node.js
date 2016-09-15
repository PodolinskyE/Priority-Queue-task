class Node {
	
	
	
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}
	
	
	
	

	appendChild(node) {
		if (this.left && this.right) return false;
		if(this.left) this.right = node;
		else this.left = node;
		node.parent = this;
		return true;
	}

	
	
	
	removeChild(node) {
		if(this.left == node){
			this.left = null;
			node.parent = null;
			return;
		}
		else if(this.right == node){
			this.right = null;
			node.parent = null;
			return;
		}
		else{
			throw new Error(node.data + "is not a child of " + this.data);
		}
	}

	
	
	
		
	
	remove() {
		if(!this.parent) return;
		this.parent.removeChild(this);
		this.parent = null;
		//this.left.parent.removeChild(this.left);
		//this.right.parent.removeChild(this.right);
	}
	
	
	

	swapWithParent() {
		if(!this.parent) return;

		var pp = null;
		var p = null;
		var n = null;
		var nIsLeft = false;

		var cl = null;
		var cr = null;
		
		p = this.parent;
		pp = p.parent;
		cl = this.left;
		cr = this.right;
						
		// 1
		if(p && pp){
			if(pp.left == p) pp.left = this;
			else pp.right = this;
		}
		

		// 2
		if(cl) cl.parent = p;
		// 3
		if(cr) cr.parent = p;
		
		
		if(p){
			
		// 4
		if(p.right && p.right == this){
			if (p.left){
				p.left.parent = this;
				this.left = p.left;
			}
			else this.left = null;
			this.right = p;
			}
		else if(p.left && p.left == this){
			if (p.right){
				p.right.parent = this;
				this.right = p.right;
			}
			else this.right = null;
			this.left = p;
		}
		
		//5
		p.left = cl;
		
		//6
		p.right = cr;
		//7
		p.parent = this;
		}
		
		//8
		this.parent = pp;

	}
		
	print(){
		document.write("<tr>");
		document.write(" | " + this.data + " : " +this.priority + " | " + "<br>");

		if(this.left) this.left.print();
		else document.write("<td>null</td>");
		document.write("<td></td>");
		if(this.right) this.right.print();
		else document.write("null");
		document.write("</tr>");
	}
		
	
}

module.exports = Node;