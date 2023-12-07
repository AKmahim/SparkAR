//==============================================================================
// PERSISTENCE MODULE CONTROL
// The function of this script is to save the filter preferences 
// for each user so that when the filter is restarted, it can look for 
// which preferences were saved.
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
// @modify date 2023-06-23 10:41:08
//
//==============================================================================


//const D = require('Diagnostics');
const Persistence = require('Persistence');

export class PersistenceModule {
	constructor(vardata) {
		this.userScope = Persistence.local;
		this.vardata = vardata;
	}
	
	getData() {
		//D.log('Data loading');
		return this.userScope.get(this.vardata);
	}
	
	setData(dataToStore) {
		this.userScope.set(this.vardata, dataToStore).then(() => {
			//D.log('Success data is stored');
		}).catch(error => {
			//D.log(`Error data is not stored: ${error}`);
		})		
	}
	
	removeData() {
		this.userScope.remove(this.vardata).then(() => {
			//D.log('Success data is removed');
		}).catch(error => {
			//D.log(`Error data is not removed: ${error}`);
		})
	}
}