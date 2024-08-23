const projectListLocal = []; // debugging var to make sure the generated obj object is correct
clipHooks.push(function(){
	projectListLocal.push(
		new Project(
			"Example AutoClipper Project", // project display name in listing (bolded) 
			"Foos and bars and the clippers", // project description in listing (not bolded)
			1, // what # id should this be? all you have to make sure is that this id is different than all your other project ids 
			[1000, "operations"], // when can you buy this project? first the amount, then the unit
			[500, "operations"], // when can you see this in your project list? first the amount, then the unit
			"This seems silly", // text to send in "console" when bought
			1, // how many times can this project be done?
			() => { // what to change, this can be literally any JS function
				boostLvl += 5; // for example, this changes an internal thing for how powerful clippers are (iirc) 
				clipmakerLevel += 500; // this makes you have 500 more autoclippers
			},
			"obsceneMod" // what mod does this project belong to?
		)
		.setup() // add this project to the list contenders
	); // push this to a local variable for debugging
}); // push into the hooks
