//==============================================================================
// MOTORBIKE GAME FOR META SPARK
// Score control script. The only function of this script is to 
// save the player's best score, and convert the score into text
// for display on the screen.
//
// @author: Fernando VR - Laikezando
// @website: https://laikezando.web.app/
//
// ## Contacts ## 
// Instagram: https://www.instagram.com/laikezando/
// Facebook: https://www.facebook.com/laikezando
//
// ## More Projects ##
// Gumroad: https://laikezando.gumroad.com/
// 
// @create date 2021-10-12 23:56:50
// @modify date 2023-06-23 10:38:51
//
//==============================================================================


// How to load in modules
const Scene = require('Scene');
const Patches = require('Patches');
const D = require('Diagnostics');
import { PersistenceModule } from './persistence.js';

(async function () { 

	const Per = new PersistenceModule('data');
	
	const saveData = (valscore) => {
		Per.setData({ score: valscore });
	}
	
	var save_bestscore = 0;
	
	Patches.inputs.setString('scoretext', '0');
	
	await Per.getData().then(data => {
		save_bestscore = (typeof data.score === 'number') ? data.score :  save_bestscore;
		var initbestscore_text = save_bestscore + " "; // ("000" + save_bestscore).slice(-3);
		Patches.inputs.setString('bestscore', 'Best: '+initbestscore_text);
	}).catch(error => {
		saveData(save_bestscore);
		Patches.inputs.setString('bestscore', "Best: 0");
	})
	
	Patches.outputs.getScalar('score').then(event=> {
		event.monitor({ fireOnInitialValue: false }).subscribe(function (values) {
			var scoreval = values.newValue + " "; // ("000" + values.newValue).slice(-3);
			Patches.inputs.setString('scoretext', scoreval);
			
			if (values.newValue > save_bestscore) {
				save_bestscore = values.newValue;
				saveData(values.newValue);
				Patches.inputs.setString('bestscore', 'Best: '+scoreval);
			}
		});
	});

})(); 
