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

function Project(name, description, id, modid, pid, price, requirement, display, uses, todo) {
	var obj = {};
	obj.id = modid+"Button"+pid;
	obj.title = name+" ";
	obj.priceTag = "("+price[0]+" "+price[1]+")";
	obj.description = description;
	if(price[1] == "operations") {
		obj.trigger = () => { return operations>=requirement[0]};
	} else if(requirement[1] == "trust") {
		obj.trigger = () => { return trust>=requirement[0]};
	} else if(requirement[1] == "clipmaker_level") {
		obj.trigger = () => { return clipmakerLevel>=requirement[0]};
	} else {
		throw new TypeError("Type not \"operations\" or \"trust\"");
		return 0;
	}
	obj.uses = uses;
	if(price[1] == "operations") {
		obj.cost = () => { return operations>=price[0]};
	} else if(price[1] == "trust") {
		obj.cost = () => { return trust>=price[0]};
	} else {
		throw new TypeError("Type not \"operations\" or \"trust\"");
		return 0;
	}
	obj.flag = moddedPurchased.includes(obj.id) | 0;
	obj.effect = () => {
		obj.flag = 1;
		displayMessage(display);
		todo();
		if(price[1] == "operations") {
			standardOps -= price[0];
		} else if(price[1] == "trust") {
			trust -= price[0];
		}
		var element = document.getElementById(obj.id);
		element.parentNode.removeChild(element);
		var index = activeProjects.indexOf(obj);
		activeProjects.splice(index, 1);
		moddedPurchased.push(obj.id);
	}
	if(!obj.flag) projects.push(obj);
	return obj;
}
window.onload = () => {
	console.log("enabling ClipMod...");
	clipInit();
	console.log("...done.");
}
