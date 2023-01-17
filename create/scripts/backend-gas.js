// this file uses google app script library

// get data from google sheets then send it to client-side
function doGet(){
  var source_sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1O4JbxbMPT03eKA5hRV4nBiZpnJLvkPLGCYX4YN-sReA/edit#gid=1065469929');
  var productSheet = source_sheet.getSheetByName('product');
  var productRowNums = productSheet.getRange('B1').getValue();
  var productArrayFS = productSheet.getRange(3,1,productRowNums,11).getValues();
  var categorySheet = source_sheet.getSheetByName('productCategory');
  var categoryRowNums = categorySheet.getRange('B1').getValue();
  var categoryArrayFS = categorySheet.getRange(3,1,categoryRowNums,2).getValues();
  var categoryArray = {};
  for (categ=0;categ<categoryArrayFS.length;categ++){
    var tempObject = new Object();
    tempObject['categoryName']=categoryArrayFS[categ][1];
    tempObject['subProduct']= [];
    categoryArray[categoryArrayFS[categ][0]]=tempObject;
    for (prod=0;prod<productArrayFS.length;prod++){
      if (productArrayFS[prod][8]==Object.keys(categoryArray)[categ]){
        tempObject['subProduct'].push(productArrayFS[prod]);
      }
    }
  }
  var tmp = HtmlService.createTemplateFromFile('index');
  tmp.categoryArray = categoryArray;
  return tmp.evaluate().setTitle('Tohfish - Admin');
}

// get customer information from google sheets file when client-side send request then send the data back
function load_info(phonenumber){
  var source_sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1O4JbxbMPT03eKA5hRV4nBiZpnJLvkPLGCYX4YN-sReA/edit#gid=1065469929');
  var customer_sh = source_sheet.getSheetByName('customer');
  var numsof_customer = customer_sh.getRange('B1').getValue();
  var phone_col = customer_sh.getRange('A3:A').getValues();
  var name_col = customer_sh.getRange('B3:B').getValues();
  var address_col = customer_sh.getRange('C3:C').getValues();
  var postcode_col = customer_sh.getRange('D3:D').getValues();
  var email_col = customer_sh.getRange('E3:E').getValues();
  var customer_list = [];
  var loadinfo = '';

  for (i=0;i<numsof_customer;i++){
    var single_customer = [];
    single_customer.push(phone_col[i]);
    single_customer.push(name_col[i]);
    single_customer.push(address_col[i]);
    single_customer.push(postcode_col[i]);
    single_customer.push(email_col[i]);
    customer_list.push(single_customer);
  }

  for (i=0;i<customer_list.length;i++){
    if (phonenumber==customer_list[i][0]){
      loadinfo = customer_list[i];
      return loadinfo;
    }
  }

  if (loadinfo==''){
    loadinfo = ['','Undefined','',''];
    return loadinfo;
  }
}

// load products from google sheets files
function loadproducts(){
  var source_sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1O4JbxbMPT03eKA5hRV4nBiZpnJLvkPLGCYX4YN-sReA/edit#gid=1065469929');
  var productSheet = source_sheet.getSheetByName('product');
  var productRowNums = productSheet.getRange('B1').getValue() - 5;
  var skuArray = productSheet.getRange(8,1,productRowNums,1).getValues();
  var prodArray = productSheet.getRange(8,2,productRowNums,2).getValues();
  var priceArray = productSheet.getRange(8,6,productRowNums,1).getValues();
  var productList = {};
  for(i=0;i<skuArray.length;i++){
    productList[skuArray[i]]=[`${prodArray[i][0]} ${prodArray[i][1]}`,prodArray[i][1],priceArray[i][0]];
  }
  return JSON.stringify(productList);
}

// Save order to google sheets files
function saveNewOrder(arrayInfo, cart){
  var cartArray = JSON.parse(cart);
  var arrayProduct = [];
  Object.keys(cartArray).forEach(line => arrayProduct.push(cartArray[line]));
  var source_sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1O4JbxbMPT03eKA5hRV4nBiZpnJLvkPLGCYX4YN-sReA/edit#gid=934191456');
  var vietnamTime = new Date().toLocaleString('en-US',{timeZone:'Asia/Ho_Chi_Minh',timestyle:'long',hourCycle:'h24'});
  vietnamTime = vietnamTime.replace(',','');
  var order_sheet = source_sheet.getSheetByName('order');
  var nextrow = order_sheet.getRange('B1').getValue();

  if(arrayInfo==null || arrayProduct==null){
    return
  } else if (arrayInfo[0]==null || arrayProduct[0]==null){
      return
  } else {
    var lastArrayInfo = [];
    for (i=0;i<arrayProduct.length;i++){
      lastArrayInfo.push(arrayInfo);
    }
    order_sheet.getRange(nextrow,19,arrayProduct.length,6).setValues(arrayProduct);
    order_sheet.getRange(nextrow,1,lastArrayInfo.length,18).setValues(lastArrayInfo);
  }
}

// Reload the page when save new order
function getScriptURL() {
  return ScriptApp.getService().getUrl();
}
