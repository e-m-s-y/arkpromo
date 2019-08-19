Socket.connect();

var canvas = $('#qr-canvas');

if(canvas.attr('data-uri') !== 'undefined') {
	// Generate QR code.
	new QRious({
		element: canvas.get(0),
		value: canvas.attr('data-uri'),
		size: 250
	});

	$('#spinner').show();
}

/**
 *
 */
function onTransactionSent() {
	$('#title').html("Transaction sent to blockchain, awaiting confirmation...");

	canvas.hide();
}

/**
 * @param data
 */
function onTransactionForged(data) {
	$('#title').html("Received tokens, customer is eligible for offer");
	$('#spinner').hide();

	canvas.hide();

	$('#checkmark').show();
}