/**
 *
 */
$('#spendingAmountInFiat').on('change keyup', function() {
	$('#tokenAmount').html('Customer will receive ' + parseFloat(($(this).val() * $('form').attr('data-arktoshi-per-whole'))).toFixed(8).toString() + ' tokens');
});