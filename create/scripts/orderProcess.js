// EDIT ORDER PAGE NAVIGATE
function editorder(){
    window.open("http://127.0.0.1:5500/edit/index.html","_blank");
}

// ############################
// #       Info Section       #
// ############################
// Define basic info
var orderInfo = [];
var subtotal = 0;
var total = 0;
var shipfee = 0;
var discountamt = 0;

document.getElementById('shipfee').addEventListener('input',updatetotal);
document.getElementById('cpamount').addEventListener('input',updatetotal);

function updatetotal(){
    total = 0;
    shipfee = document.getElementById('shipfee').value;
    discountamt = document.getElementById('cpamount').value;
    if (shipfee!=="" && discountamt!==""){
        total = subtotal + parseFloat(shipfee) - parseFloat(discountamt);
    } else if (shipfee!=="" && discountamt==""){
        total = subtotal + parseFloat(shipfee);
    } else if (shipfee=="" && discountamt!==""){
        total = subtotal - parseFloat(discountamt);
    } else {
        total = subtotal;
    }
    document.getElementById('total').innerText = (Math.round(total * 100) / 100).toFixed(2) + " $";
}

function updateInfo(){
    var tempInfo = [];
    tempInfo[0] = document.getElementById('sdt1').value;
    tempInfo[1] = document.getElementById('name1').value;
    tempInfo[2] = document.getElementById('name2').value;
    tempInfo[3] = document.getElementById('sdt2').value;
    tempInfo[4] = document.getElementById('address').value;
    tempInfo[5] = document.getElementById('postcode').value;
    tempInfo[6] = subtotal;
    tempInfo[7] = document.getElementById('shipfee').value;
    tempInfo[8] = document.getElementById('cpamount').value;
    tempInfo[9] = total;
    tempInfo[10] = document.getElementById('cpcode').value;
    tempInfo[11] = document.getElementById('ordernote').value;
    tempInfo[12] = document.getElementById('emailadd').value;
    tempInfo[13] = document.getElementById('adminname').value;
    tempInfo[14] = document.getElementById('address2').value;
    orderInfo = tempInfo;
}

function printbill(){
    updateInfo();
    billprint(orderInfo, cartArray);
}

// ############################
// #       Cart Section       #
// ############################

var cartArray = {};
var rmvArray = [];
var addProdCount = 0;

function updatesubtotal(){
    subtotal = 0;
    var cartLines = Object.keys(cartArray);
    cartLines.forEach(key =>{
            subtotal += cartArray[key][5];
        }
    )
    document.getElementById('subtotal').innerText = (Math.round(subtotal * 100) / 100).toFixed(2) + " $";
};

// Make current ID
function makeid(length1, length2) {
    var vnTime = new Date().toLocaleString('en-US',{timeZone:'Asia/Ho_Chi_Minh',timestyle:'short',hourCycle:'h24'});
    var day = new Date(vnTime).getDate();
    var year = new Date(vnTime).getFullYear().toString().slice(-2);
    var month = new Date(vnTime).getMonth()+1;
    var hour = ("0"+(new Date(vnTime).getHours())).slice(-2);
    var minute = ("0"+(new Date(vnTime).getMinutes())).slice(-2);
    var second = ("0"+(new Date(vnTime).getSeconds())).slice(-2);
    var charResult       = '';
    var numbResult       = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    var numberLength     = characters.length;
    for ( var i = 0; i < length1; i++ ) {
        charResult += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    for ( var i = 0; i < length2; i++ ) {
        numbResult += characters.charAt(Math.floor(Math.random() * numberLength));
    }
    return result=year+month+day+'-'+charResult+hour+numbResult+minute+second;
}

// Place order
function placeOrder(){
updateInfo();
    if(orderInfo[0]!=='' && orderInfo[12]!=='' && Object.keys(cartArray).length>0){
        var orderID = makeid(1,1);
        orderInfo.unshift(orderID);
        var cart = JSON.stringify(cartArray);
        google.script.run.saveNewOrder(orderInfo,cart);
        function reLoad() {
            google.script.run
            .withSuccessHandler(function(url){
            window.open(url,'_top');
        })
        .getScriptURL();
        }
        reLoad(`http://127.0.0.1:5500/create/index.html`);
    } else {
        alert('Not enough information: phone number and email fields are needed.');
    }
}



// Product list object
function collectassign(prosearClass,inputid,packageid,prodpriceid,cartKey){
    var collect = document.querySelectorAll("."+prosearClass);
    collect.forEach(item => item.addEventListener('mousedown', event => {setProduct(item.id,inputid,packageid,prosearClass,prodpriceid,cartKey);}));
}

// Set value on search product input
function setProduct(idatag,inputid,packageid,prosearClass,prodpriceid,cartKey){
    var productName = document.querySelector("."+prosearClass+"#"+idatag).innerText;
    document.getElementById(inputid).value = productName;
    document.getElementById(packageid).innerText = productList[idatag][1];
    document.getElementById(prodpriceid).innerText = productList[idatag][2];
    var quantityid = "quantity"+prodpriceid.substring(9,prodpriceid.length);
    catchInputEvent(productName, productList[idatag][1], idatag, cartKey);
}

google.script.run.withSuccessHandler(addProdClick).loadproducts();

function updateproducts(){
    google.script.run.withSuccessHandler(getProducts).loadproducts();
}

function getProducts(prodlist){
    productList = JSON.parse(prodlist);
}

var productList = {};

function addProdClick(prodlist){
    productList = JSON.parse(prodlist);
    if(productList==null){
        alert('undefined');
    } else {
        addProdCount+=1;
        var currentProdName = `line-${addProdCount}`;

        // Create new row
        var numsofchild = document.getElementById('selectProdTab').rows.length;
        var nextRowEl = document.getElementById('selectProdTab').insertRow(numsofchild);
        var newDiv = document.createElement('div');
        newDiv.classList.add('dropdown');
        var inputid = 'myInput'+(addProdCount);
        var dropid = 'myDropdown'+(addProdCount);
        var prosearClass = 'prodsearch'+(addProdCount);
        var aTag = '';

        for(i=0;i<Object.keys(productList).length;i++){
            var currentKey = Object.keys(productList)[i];
            aTag+=`<a class=${prosearClass} id=${currentKey}>${productList[currentKey][0]}</a>`;
        }

        var productLine = `
            <input type="text" placeholder="tìm sản phẩm" id="${inputid}"  class="myInput">
            <div id="${dropid}" class="dropdown-content">
                ${aTag}
            </div>
        `;

        newDiv.innerHTML = productLine;
        nextRowEl.insertCell(0).appendChild(newDiv);
        nextRowEl.insertCell(1).id = `package${addProdCount}`;
        nextRowEl.insertCell(2).classList.add("quantity");
        nextRowEl.insertCell(3).id = `prodprice-${addProdCount}`;
        nextRowEl.insertCell(4).classList.add("quantity");
        nextRowEl.insertCell(5).id = `subtotal-${addProdCount}`;
        nextRowEl.insertCell(6).classList.add("aligntext");
        nextRowEl.cells[2].innerHTML = `<input type="number" id="quantity-${addProdCount}" min="1"  oninput="this.value = !!this.value && Math.abs(this.value) >= 1 ? Math.abs(this.value) : 1">`;
        nextRowEl.cells[4].innerHTML = `<input type="number" id="offerprice-${addProdCount}">`;
        nextRowEl.cells[6].innerHTML = `<button class="deletebtn" id="delete-${addProdCount}" onclick="deleterow(this,${addProdCount},'${currentProdName}');">&times;</button>`;

        // Display dropdown list
        document.getElementById(inputid).addEventListener('click', event =>{myFunction(inputid, dropid);});
        document.getElementById(inputid).addEventListener('input', event =>{myFunction(inputid, dropid);});
        collectassign(prosearClass,inputid,nextRowEl.cells[1].id,nextRowEl.cells[3].id,currentProdName);
        blurdropdown(inputid,dropid);
        nextRowEl.cells[1].classList.add('aligntext');
        nextRowEl.cells[2].classList.add('aligntext');
        nextRowEl.cells[3].classList.add('aligntext');
        nextRowEl.cells[4].classList.add('aligntext');
        nextRowEl.cells[5].classList.add('aligntext');
    }
}

function myFunction(idtag,dropid) {
    document.getElementById(dropid).classList.toggle("show");
    filterFunction(dropid,idtag);
}

// Search from search box
function filterFunction(dropid, inputid) {
    document.getElementById(dropid).style.display = 'block';
    var input, filter, ul, li, a, i;
    input = document.getElementById(inputid);
    filter = input.value.toUpperCase();
    div = document.getElementById(dropid);
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
        } else {
        a[i].style.display = "none";
        }
    }
}

function deleterow(btn,rowid,lineid){
    if(rowid > 0){
        var row = btn.parentNode.parentNode;
        row.parentNode.removeChild(row);
        delete cartArray[lineid];
        rmvArray.push(lineid);
    }
    updatesubtotal();
    updatetotal();
}

function blurdropdown(inputid, dropid){
    document.getElementById(inputid).addEventListener('blur', event => {
        document.getElementById(dropid).style.display = 'none';
    },true);
}

document.getElementById('addProduct').addEventListener('click',function() {addProdClick(JSON.stringify(productList));});

function catchInputEvent(cartName, cartPackage, cartSKU, cartKey){
    var linenum = parseInt(cartKey.substring(cartKey.indexOf('-')+1,cartKey.length));
    var qtyInput = document.querySelectorAll('.quantity.aligntext');
    qtyInput.forEach(item => item.addEventListener("input",function(){
        if(rmvArray.indexOf(cartKey)==-1){
            var statedprice = parseFloat(document.getElementById('prodprice-'+linenum).innerText);
            var quantity = document.getElementById('quantity-'+linenum).value;
            var offerprice = document.getElementById('offerprice-'+linenum).value;
            if (offerprice==null || offerprice==""){
                offerprice=statedprice;
            }
            var subtolal = quantity * offerprice;
            document.getElementById('subtotal-'+linenum).innerText = (Math.round(subtolal * 100) / 100).toFixed(2) + " $";
            if((quantity!=="" || quantity>0)){
                var tempCart = [cartName,cartPackage,quantity,cartSKU,offerprice,subtolal];
                cartArray[cartKey]=tempCart;
            }
            updatesubtotal();
            updatetotal();
        }
    }))
}

// Nút tìm thông tin khách
document.getElementById('lookupbtn').addEventListener('click',loadinfo);
function loadinfo(){
    var phonenumber = document.getElementById('sdt1').value;
    if (phonenumber.length>5){
        google.script.run.withSuccessHandler(update_Info).load_info(phonenumber);
    }
}

function update_Info(customerInfo){
    document.getElementById('name1').value = customerInfo[1];
    document.getElementById('address').value = customerInfo[2];
    document.getElementById('postcode').value = customerInfo[3];
    document.getElementById('emailadd').value = customerInfo[4];
}

// Load địa chỉ Bishan
document.getElementById('amyhouse').addEventListener('change',function(){
    if (this.checked) {
        document.getElementById('address').value = 'Bishan';
        document.getElementById('postcode').value = '570205';
    } else {
        document.getElementById('address').value = '';
        document.getElementById('postcode').value = '';
    }
})

// Load thông tin người nhận
document.getElementById('samerec').addEventListener('change',function(){
    if (this.checked) {
        document.getElementById('name2').value = document.getElementById('name1').value;
        document.getElementById('sdt2').value = document.getElementById('sdt1').value;
    } else {
        document.getElementById('name2').value = '';
        document.getElementById('sdt2').value = '';
    }
})