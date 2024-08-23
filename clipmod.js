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
	setup() {
		this.obj.id = this.modid+"Button"+this.pid;
		this.obj.title = this.name+" ";
		this.obj.priceTag = "("+this.price[0]+" "+this.price[1]+")";
		this.obj.description = this.description;
		if(this.price[1] == "operations") {
			this.obj.trigger = () => { return operations>=this.requirement[0]};
		} else if(this.requirement[1] == "trust") {
			this.obj.trigger = () => { return trust>=this.requirement[0]};
		} else if(this.requirement[1] == "clipmaker_level") {
			this.obj.trigger = () => { return clipmakerLevel>=this.requirement[0]};
		} else {
			throw new TypeError("Type not \"operations\" or \"trust\"");
			return 0;
		}
		this.obj.uses = this.uses;
		if(this.price[1] == "operations") {
			this.obj.cost = () => { return operations>=this.price[0]};
		} else if(this.price[1] == "trust") {
			this.obj.cost = () => { return trust>=this.price[0]};
		} else {
			throw new TypeError("Type not \"operations\" or \"trust\"");
			return 0;
		}
		this.obj.flag = moddedPurchased.includes(this.obj.id) | 0;
		this.obj.effect = () => {
			this.obj.flag = 1;
			displayMessage(this.display);
			this.todo();
			if(this.price[1] == "operations") {
				standardOps -= this.price[0];
			} else if(this.price[1] == "trust") {
				trust -= this.price[0];
			}
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
