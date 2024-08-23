/**
 * Welcome to the ClipMod source!
 * This is an on-and-off hobby project by mechanikate. Don't expect frequent updates because I get distracted.
 * Your most useful resource, as of now, will be exampleMod.js 
 */
var clipHooks = [];
var moddedPurchased = [];
clipHooks.push(() => {
	console.log("ClipMod enabled.");
});

function clipInit() {
	for(var i=0; i<clipHooks.length; i++) {
		clipHooks[i]();
	}
}

class Project {
	constructor(name, description, pid, price, requirement, display, uses, todo, modid) {
		this.name = name;
		this.description = description;
		this.pid = pid;
		this.price = price;
		this.requirement = requirement;
		this.display = display;
		this.uses = uses;
		this.todo = todo;
		this.modid = modid;
		this.obj = {};
		
	}
	priceTag() {
		let result = [];
		if(typeof this.price["operations"] === "number") result.push(`${this.price["operations"]} ops`);
		if(typeof this.price["trust"] === "number") result.push(`${this.price["trust"]} trust`);
		if(!result.length) return "";
		return `(${result.join(", ")})`;
	}
	setup() {
		this.obj.id = this.modid+"Button"+this.pid;
		this.obj.title = this.name+" ";
		this.obj.priceTag = this.priceTag();
		this.obj.description = this.description;
		var localOperationsPrice = this.price["operations"];
		var localTrust = this.requirement["trust"];
		var localTrustPrice = this.price["trust"];
		var localClipmakerLevel = this.requirement["clipmaker_level"];
		this.obj.trigger = () => {
			if(typeof localOperationsPrice === "number" && operations<localOperationsPrice) return false;
			if(typeof localTrust === "number" && trust<localTrust) return false;
			if(typeof localClipmakerLevel === "number" && clipmakerLevel<localClipmakerLevel) return false;
			return true;
		}
		this.obj.uses = this.uses;
		this.obj.cost = () => {
			if(typeof localOperationsPrice === "number" && operations<localOperationsPrice) return false;
			if(typeof localTrustPrice === "number" && trust<localTrustPrice) return false;
			return true;
	
		};
		this.obj.flag = moddedPurchased.includes(this.obj.id) | 0;
		this.obj.effect = () => {
			this.obj.flag = 1;
			displayMessage(this.display);
			this.todo();
			standardOps -= typeof this.price["operations"] === "number" ? this.price["operations"] : 0;
			trust -= typeof this.price["trust"] === "number" ? this.price["trust"] : 0;
			var element = document.getElementById(this.obj.id);
			element.parentNode.removeChild(element);
			var index = activeProjects.indexOf(this.obj);
			activeProjects.splice(index, 1);
			moddedPurchased.push(this.obj.id);
		}
		if(!this.obj.flag) projects.push(this.obj);
		return this;
	}	
}
window.onload = () => {
	console.log("enabling ClipMod...");
	clipInit();
	console.log("...done.");
}
