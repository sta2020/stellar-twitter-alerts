var matchingObj = {};
    matchingObj.usernames = [];

module.exports = {


  findMatchingUser: function (usersObj,operation) {
    

    if (usersObj === 'undefined') {
      usersObj = [];
    }
    matchingObj.usernames = [];
    switch(operation.type_i){
      case 0:
        this.getUsername(usersObj,operation.source_account);
        this.getUsername(usersObj,operation.account);
        
        matchingObj.text = "Create Account\n"+"ID: "+operation.id+"\nAccount"+operation.account;
        matchingObj.text += "\nFunder: "+operation.funder+"\nStarting Balance: "+operation.starting_balance;
      
      break;
      
      case 1:
        this.getUsername(usersObj,operation.from);
        this.getUsername(usersObj,operation.account);
        var asset = operation.asset_type === 'native' ? 'XLM' : operation.asset_code;
        
        matchingObj.text = "Payment\nFrom: "+operation.from+"\nTo: "+operation.to;
        matchingObj.text += "\nAsset: "+asset+"\nAmount: "+operation.amount;
               
      break;

      case 2:
        this.getUsername(usersObj,operation.from);
        this.getUsername(usersObj,operation.account);
        var asset = operation.asset_type === 'native' ? 'XLM' : operation.asset_code;
        var sent_asset = operation.sent_asset_type === 'native' ? 'XLM' : operation.sent_asset_code;
        
        matchingObj.text = "Path Payment\nID: "+operation.id+"\nFrom: "+operation.from;
        matchingObj.text += "\nTo: "+operation.to+"\nAsset: "+asset+"\nAmount: "+operation.amount;
        matchingObj.text += "\nSent Asset: "+sent_asset+"\nSource Amount: "+operation.source_amount;

      break;

      case 3:
        this.getUsername(usersObj,operation.source_account);

        var buying_asset = operation.buying_asset_type === 'native' ? 'XLM' : operation.buying_asset_code;
        var selling_asset = operation.selling_asset_type === 'native' ? 'XLM' : operation.selling_asset_code;
        

        matchingObj.text = "Manage Offer \nID: "+operation.id+"\nOffer ID: "+operation.offer_id;
        matchingObj.text += "\nAmount: "+operation.amount+"\nBuying Asset: "+buying_asset;
        matchingObj.text += "\nBuying Asset Issuer: "+operation.buying_asset_issuer;
        matchingObj.text += "\nSelling Asset: "+selling_asset+"\nSelling Asset Issuer: "+operation.selling_asset_issuer;
        matchingObj.text += "\nPrice: "+operation.price;

      break;

      case 4:
        this.getUsername(usersObj,operation.source_account);

        var buying_asset = operation.buying_asset_type === 'native' ? 'XLM' : operation.buying_asset_code;
        var selling_asset = operation.selling_asset_type === 'native' ? 'XLM' : operation.selling_asset_code;
        
        matchingObj.text = "Passive Offer \nID: "+operation.id+"\nOffer ID: "+operation.offer_id;
        matchingObj.text += "\nAmount: "+operation.amount+"\nBuying Asset: "+buying_asset;
        matchingObj.text += "\nBuying Asset Issuer: "+operation.buying_asset_issuer;
        matchingObj.text += "\nSelling Asset: "+selling_asset+"\nSelling Asset Issuer: "+operation.selling_asset_issuer;
        matchingObj.text += "\nPrice: "+operation.price;
  
      break;
      case 5:
        this.getUsername(usersObj,operation.source_account);
          
        matchingObj.text = "Set Options\nID: "+operation.id;
        matchingObj.text += operation.low_threshold ? "\nLow threshold: "+operation.low_threshold : "";
        matchingObj.text += operation.med_threshold ? "\nMedium threshold: "+operation.med_threshold : "";
        matchingObj.text += operation.high_threshold ? "\nHigh threshold: "+operation.high_threshold : "";
        matchingObj.text += operation.home_domain ? "\nHome Domain: "+operation.home_domain : "";                
        matchingObj.text += operation.signer_key ? "\nSigner Key: "+operation.signer_key : "";
        matchingObj.text += operation.signer_weight ? "\nSigner Weight: "+operation.signer_weight : "";
        matchingObj.text += operation.master_key_weight ? "\nMaster Key Weight: "+operation.master_key_weight : "";

      break;
      case 6:
        this.getUsername(usersObj,operation.source_account);
        this.getUsername(usersObj,operation.trustee);
        
        var asset = operation.asset_type === 'native' ? 'XLM' : operation.asset_code;
        matchingObj.text = "Change Trust\nID: "+operation.id+"\nTrustee: "+operation.trustee;
        matchingObj.text += "\nTrustor: "+operation.trustor+"\nLimit: "+operation.limit;
        matchingObj.text += "\nAsset: "+asset+"Asset Issuer: "+operation.asset_issuer;

      break;

      case 7:
        
        this.getUsername(usersObj,operation.trustor);
        this.getUsername(usersObj,operation.trustee);
        var asset = operation.asset_type === 'native' ? 'XLM' : operation.asset_code;
        
        matchingObj.text = "Allow Trust\nID: "+operation.id+"\nTrustee: "+operation.trustee;
        matchingObj.text += "\nTrustor: "+operation.trustor+"\nLimit: "+operation.limit;
        matchingObj.text += "\nAsset: "+asset+"Asset Issuer: "+operation.asset_issuer;
        matchingObj.text += "\nAuthorize: "+operation.authorize;

      break;
      
      case 8:

        this.getUsername(usersObj,operation.source_account);
        this.getUsername(usersObj,operation.into);

        matchingObj.text = "Merge Account\nID: "+operation.id+"\nAccount: "+operation.account;
        matchingObj.text += "\nInto: "+operation.into;

      break;
      
      default: 
        this.getUsername(usersObj,operation.source_account);
        matchingObj.text = "Stellar Operation\nType: "+operation.type_i;
      ;
    }    
    
    return matchingObj;
  },

  

  getUsername: function(haystack,needle) {
    
    haystack.forEach(function(hay) {
      if (hay.account_id === needle) {
        matchingObj.usernames.push(hay);
      }
    });
    return true;
  },

  

};

