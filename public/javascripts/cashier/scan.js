Socket.connect();

$('#spinner').show();

/**
 * @param data
 */
function onTransactionSent(data) {
	$('#title').html('Transaction broadcasted to blockchain, awaiting confirmation...');
	$('#video').fadeOut(200);
}

/**
 * @param data
 */
function onTransactionFailed(data) {
	$('#title').html("Transaction failed.");
	$('#spinner').hide();
	$('#video').fadeOut(200);
}

/**
 * @param data
 */
function onTransactionForged(data) {
	$('#title').html("Transaction confirmed, you've received your tokens.");
	$('#video').fadeOut(200);
	$('#spinner').hide();
	$('#checkmark').show();
}

// Ask for camera permission, when given initiate QR code reader.
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	const codeReader = new ZXing.BrowserQRCodeReader();

	codeReader.decodeFromInputVideoDevice(undefined, 'video')
		.then(function(result) {
			Socket.emit('transaction.new', {
				amount: $('#video').attr('data-amount'),
				recipientId: result.text.split(':')[1]
			});
		}).catch(function() {
			console.error('No camera found / no camera permission');
		});
}