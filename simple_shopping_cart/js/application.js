var costUpdate = function() {
    var costArray = [];
    $('tbody tr').each(function (i, item) {
        var price = parseFloat($(item).find('.price').text());
        var quantity = parseFloat($(item).find('.quantity input').val());
        var itemCost = price * quantity;
        if (quantity) {
            $(item).children('.total').html(itemCost.toFixed(2));
            costArray.push(itemCost);
        } else {
            $(item).children('.total').html('');
        }
    });
    var total = costArray.length > 0 ? costArray.reduce((sum, num) => sum + num) : 0;
    $('#beforeTax').html(total.toFixed(2));
    var taxPercent = parseFloat($(item).find('.price').val());
    var taxCalc = total * .07;
    var totalCost = total + taxCalc;
    $('#taxes').html(taxCalc.toFixed(2));
    $('#fullTotal').html(totalCost.toFixed(2));
};

var itemAdd = function () {
    var newItem = $('#item').val();
    var newPrice = parseFloat($('#price').val()).toFixed(2);
    if (!newItem || isNaN(newPrice)) {
        alert('Please enter BOTH price and name.');
    } else {
        $('#addItem').before("<tr><td class='item'>" + newItem + "</td><td class='price'>" + newPrice + "</td><td class='quantity'><input type='number'></input><td class='total'>0.00</td><td><button class='btn btn-sm remove'>Remove</button></td></tr>");
    }
    $('tr').find('#item, #price').val('');
};

var removeItem = function() {
    $(this).closest('tr').remove();
    costUpdate();
};
  
var updateQty = function () {
    clearTimeout(delay);
    var delay = setTimeout(costUpdate, 500);
};

$(document).ready(function() {
    costUpdate();
    $(document).on('input', '.quantity', updateQty);
    $(document).on('input', '.total', costUpdate);
    $(document).on('click', '.remove', removeItem);
    $(document).on('click', '.add', itemAdd);
    $('#price').on('keyup', function(event) {
      if (event.key === 'Enter') {
        itemAdd();
    }
    });
});



