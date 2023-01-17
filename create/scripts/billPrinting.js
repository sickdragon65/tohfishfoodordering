function billprint(orderinfo, cartarray){
	var subtotalpv = (Math.round(orderinfo[8] * 100) / 100).toFixed(2) + " $";
	var part1 = `
		<div class="billprint">
			<div class="header">
				<div class="logo">
					<img src="logo.jpg" alt="">
				</div>
				<div class="socialmedia">
					<p><i class='bx bx-globe'></i>  tohfish.com</p>
					<p><i class='bx bxl-facebook-circle' ></i>  facebook.com/TOHfish</p>
					<p><i class='bx bxs-phone-call' ></i>  +84 909832269</p>
				</div>
				<div class="companyaddress">
					<p><i class='bx bxs-map' ></i> 332/38 Thoại Ngọc Hầu, Phường 15, Quận Gò Vấp, TP. Hồ Chí Minh, Việt Nam</p>
				</div>
			</div>
			<div class="orderinfo">
				<div class="customerinfo">
					<h1>Customer Info:</h1>
					<table>
						<tr>
							<td class="tbtag">Orderer: </td>
							<td class="tbamount" style="font-weight: bold; font-size: 16px; line-height: 22px;">${orderinfo[1]}</td>
						</tr>
						<tr>
							<td class="tbtag"></td>
							<td class="tbamount">${orderinfo[0]}</td>
						</tr>
						<tr>
							<td class="tbtag"></td>
							<td class="tbamount">${orderinfo[6]}</td>
						</tr>
						<tr>
							<td class="tbtag">Receiver: </td>
							<td class="tbamount" style="font-weight: bold; font-size: 16px; line-height: 22px;">${orderinfo[3]}</td>
						</tr>
						<tr>
							<td class="tbtag"></td>
							<td class="tbamount">${orderinfo[2]}</td>
						</tr>
						<tr>
							<td class="tbtag"></td>
							<td class="tbamount">${orderinfo[4]}</td>
						</tr>
						<tr>
							<td class="tbtag">Notes:</td>
							<td class="tbamount">${orderinfo[7]}</td>
						</tr>
					</table>
				</div>
					<div class="amountinfo">
						<div class="ordertag">
							<h1>INVOICE</h1>
							<p>Order ID: 22423-F16P4601</p>
							<table>
								<tr>
								<td class="tbtag">Subtotal: </td>
									<td class="tbamount">${subtotalpv}</td>
								</tr>
								<tr>
									<td class="tbtag">Shipping fee: </td>
									<td class="tbamount">40.0 $</td>
								</tr>
								<tr>
									<td class="tbtag">Discount amount: </td>
									<td class="tbamount">0.0 $</td>
								</tr>
							</table>
							<h3>Required Payment: 1,235.5 $</h3>
						</div>
					</div>
			</div>
			<div class="productlist">
				<table>
					<tr>
						<th style="width: 50px;"></th>
						<th style="width: 300px;">Items</th>
						<th style="width: 80px;">Unit price</th>
						<th style="width: 80px;">Quantity</th>
						<th style="width: 100px; position: relative;">
							<div class="amounttag">
									Amount
							</div>
						</th>
						<th style="width: 50px;"></th>
					</tr>`;
	var part2 = '';
	var linenum = 100;
	Object.keys(cartarray).forEach(item => {
		linenum--;
		if(linenum % 2 === 0){
			var linecolor = "#f5f5f5";
		} else {
			var linecolor = "#ffffff";
		}
		var amountpv = (Math.round(cartarray[item][5] * 100) / 100).toFixed(2) + " $";
		part2
			+= `
				<tr style="background: ${linecolor};">
					<td></td>
					<td style="text-align: left;">
						<p>${cartarray[item][0]}</p>			
					</td>
					<td>${cartarray[item][4]} $</td>
					<td>${cartarray[item][2]}</td>
					<td style="width: 100px; position: relative; ">
						<div class="amounttag" style="background: ${linecolor}; z-index: ${linenum};">
								${amountpv}
						</div>
					</td>
					<td style="width: 50px;"></td>
				</tr>
			`;
	});
	var part3 = `
						<tr>
							<td colspan="4" style="text-align: right; line-height: 40px; color: #1a936f; font-weight: bold;">SUBTOTAL:</td>
							<td style="width: 100px; position: relative;">
								<div class="amounttag" style="font-weight: bold; background: #fee1ae; z-index: 90; line-height: 35px;">
										${subtotalpv}
								</div>
							</td>
							<td style="width: 50px;"></td>
						</tr>
					</table>
			</div>
			<div class="footer">
				<p class="companyname">TOH FISH JSC.</p>
				<P class="thankyou">Thank you for shopping with us.</P>
				<p class="pagenum">Page 1/2</p>
			</div>
		</div>`;
	var iPrint = part1 + part2 + part3;
	var docprint = window.open("","");
	docprint.document.open();
	docprint.document.write('<!DOCTYPE html><html>');
	docprint.document.write('<head><meta name="viewport" content="width=device-width, initial-scale=1.0">');
	docprint.document.write("<link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>");
	docprint.document.write('<title>Print</title>');
	docprint.document.write(`
		<style type="text/css">
			body{
					margin: 0px;
					padding: 0px;
					font-family: 'Nunito Sans', sans-serif;
					/* background-color: aqua; */
					/* height: 100vh; */
			}

			@page{
					margin: 0px;
			}

			@media print {
					body {-webkit-print-color-adjust: exact;}
			}

			.billprint{
					padding: 60px 0px;
					margin: 0px auto;
					/* height: 297mm;  */
					height: 265.25mm;
					width: 210mm;
					position: relative;
					/* background-color: pink; */
			}

			/* .header {
					margin-top: 60px;
			} */

			.header .logo {
					position: relative;
			}

			.header .logo img {
					position: absolute;
					top: -20px;
					left: 40px;
					max-width: 180px;
			}

			.header .socialmedia {
					background-color: #1a936f;
					height: 30px;
					line-height: 30px;
					text-align: right;
					padding-right: 30px;
			}

			.header .socialmedia p {
					display: inline;
					font-size: 12px;
					color: white;
					padding-left: 5px;
					vertical-align: middle;
			}

			.header .socialmedia p i {
					display: inline;
					font-size: 15px;
					color: white;
					vertical-align: middle;
			}

			.header .companyaddress {
					background-color: #ddd;
					height: 30px;
					line-height: 30px;
					text-align: right;
					padding-right: 30px;
			}

			.header .companyaddress p {
					display: inline;
					font-size: 12px;
					color: black;
					padding-left: 5px;
					vertical-align: middle;
			}

			.header .companyaddress p i {
					display: inline;
					font-size: 15px;
					color: black;
					vertical-align: middle;
			}

			.orderinfo {
					margin: 60px 60px 20px 60px;
					border: 0px;
					border-radius: 10px;
					display: flex;
					height: 200px
			}

			.orderinfo .customerinfo {
					width: 100%;
			}

			.orderinfo .customerinfo table {
					margin-top: 10px;
			}

			.orderinfo .customerinfo table td {
					line-height: 17px;
			}

			.orderinfo .customerinfo table .tbtag {
					width: 80px;
					font-size: 13px;
					font-weight: bold;
			}

			.orderinfo .customerinfo table .tbamount {
					width: 280px;
					font-size: 13px;
			}

			.orderinfo .customerinfo h1 {
					text-align: left;
					color: black;
					border-bottom: 1px solid #1a936f;
					margin: 0px auto;
					padding: 10px 0px;
					font-weight: lighter;
			}

			.orderinfo .customerinfo p {
					padding-top: 10px;
					text-align: left;
					color: black;
					font-size: 15px;
					line-height: 25px;
					margin: 0px;
			}

			.orderinfo .amountinfo {
					width: 60%;
					position: relative;
			}

			.orderinfo .amountinfo .ordertag {
					background: #1a936f;
					position: absolute;
					width: 300px;
					/* height: 200px; */
					right: 0px;
					top: 0px;
					border-radius: 15px;
			}

			.orderinfo .amountinfo .ordertag h1 {
					text-align: center;
					color: white;
					border-bottom: 1px solid white;
					margin: 0px auto;
					padding: 10px 0px;
			}

			.orderinfo .amountinfo .ordertag p {
					color: white;
					text-align: center;
					font-size: 15px;
					padding: 8px;
					margin: 0px;
					font-weight: bold;
					line-height: 20px;
			}

			.orderinfo .amountinfo .ordertag table {
					margin: auto;
			}

			.orderinfo .amountinfo .ordertag table td {
					line-height: 15px;
			}

			.orderinfo .amountinfo .ordertag table .tbtag {
					color: white;
					text-align: left;
					font-size: 15px;
					padding: 5px;
					margin: 0px;
			}

			.orderinfo .amountinfo .ordertag table .tbamount {
					color: white;
					text-align: right;
					font-size: 15px;
					padding: 5px;
					margin: 0px;
			}

			.orderinfo .amountinfo .ordertag h3 {
					color: #1a936f;
					text-align: center;
					font-size: 18px;
					background: white;
					border-radius: 5px;
					line-height: 40px;
					margin: 15px;
			}

			.productlist {
					color: 'light green';
					margin: 100px auto;
					padding: 0px;
			}

			.productlist table {
					border-collapse: collapse;
					width: 100%;
					margin: auto;
			}

			.productlist table th {
					background: #1a936f;
					line-height: 20px;
					color: white;
			}

			.productlist table th .amounttag {
					position: absolute;
					top: -8px;
					color: black;
					width: 110px;
					background-color: #fee1ae;
					padding-top: 6px;
					/* border-radius: 5px; */
					border-top: 5px solid #fee1ae;
					border-left: 5px solid #fee1ae;
					border-right: 5px solid #fee1ae;
					border-bottom: 0px;
					z-index: 100;
			}

			.productlist table td {
					line-height: 25px;
					text-align: center;
					font-size: 13px;
			}

			.productlist table td p{
					padding: 0px;
					margin: 0px;
					line-height: 15px;
					font-size: 13px;
			}

			.productlist table td .amounttag {
					text-align: center;
					position: absolute;
					top: -5px;
					color: black;
					width: 110px;
					background-color: white;
					padding-top: 7px;
					/* border-radius: 5px; */
					/* border-top: 5px solid #1a936f; */
					border-left: 5px solid #fee1ae;
					border-right: 5px solid #fee1ae;
					/* border-bottom: 0px; */
			}

			.footer {
					position: absolute;
					margin: 0px;
					padding: 0px;
					bottom: 30px;
					width: 100%;
			}

			.footer .companyname {
					background-color: #ddd;
					height: 30px;
					line-height: 30px;
					text-align: center;
					font-weight: bold;
					margin: 0px;
			}

			.footer .thankyou {
					background-color: #1a936f;
					color: white;
					height: 30px;
					line-height: 30px;
					text-align: center;
					font-weight: lighter;
					margin: 0px;
			}

			.footer .pagenum {
					color: black;
					height: 30px;
					line-height: 30px;
					padding-right: 30px;
					text-align: right;
					font-weight: lighter;
					margin: 0px;
			}
		</style>`);
	docprint.document.write(`</head><body>`);
	docprint.document.write(iPrint);
	docprint.document.write(`</body></html>`);
	docprint.document.close();
	docprint.focus();
}
