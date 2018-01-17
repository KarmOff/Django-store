$(document).ready(function() {
    var form = $('#form_buying_product');

    function basketUpdating(product_id,count,product_name,product_price, is_delete) {
        var data = {};
        data.product_name = product_name;
        data.product_price = product_price;
        data.product_id = product_id;
        data.count = count;
        var csrf_token = $('#form_buying_product [name="csrfmiddlewaretoken"]').val();
        data["csrfmiddlewaretoken"] = csrf_token;

        if(is_delete) {
            data['is_delete'] = true;
        }

        var url = form.attr("action");
        $.ajax({
             url: url,
             type: 'POST',
             data: data,
             cache: true,
             success: function (data) {
                console.log("ajax success");
                if(data.product_total_count || data.product_total_count==0) {
                    $('#basket_total_count').text("("+data.product_total_count+")");
                    $('.basket-items ul').html("");
                    $.each(data.products, function (k, v) {
                        $('.basket-items ul').append('<li>'+v.name+', ' + v.count + 'шт. ' + 'по ' + v.price_per_item + 'Р  ' +
                            '<a class="delete-item" href="" data-product_id="'+ v.id +'">Удалить</a>'+
                        '</li>');
                    });
                }
             },
             error: function(){
                 console.log("error");
             }
         });
    };


    form.on('submit', function (e) {
        e.preventDefault();
        var count = $('.form_buying_product__count').val();
        var btn = $('.form_buying_product__btn');
        var product_id = btn.data('product_id');
        var product_name = btn.data('product_name');
        var product_price = btn.data('product_price');

        basketUpdating(product_id,count,product_name,product_price, is_delete=false);

    });


    function showingBasket(){
        $('.basket-items').removeClass('hidden');
    }

     $('.basket-container').mouseover(function(){
         showingBasket();
     });



     $(document).on('click', '.delete-item', function(e){
         e.preventDefault();
         var product_id = $(this).data('product_id');
         var product_name = $(this).data('product_name');
         var product_price = $(this).data('product_price');
         var count = 0;
         basketUpdating(product_id, count, product_name, product_price, is_delete=true);
     });
     
     
     function calculatingBasketAmount() {
         var total_order_amount = 0;
         $('.total_product_in_basket_amount').each(function () {
            total_order_amount += parseFloat($(this).text());
         });
         $("#total_order_amount").text(total_order_amount.toFixed(2));
     }

     $(document).on('change', '.product_in_basket_count', function () {
        var current_count = $(this).val();
        var current_tr = $(this).closest('tr');
        var current_price = parseFloat(current_tr.find('.product_in_basket_price_per_item').text()).toFixed(2);
        var total_amount = parseFloat(current_count * current_price).toFixed(2);
        current_tr.find('.total_product_in_basket_amount').text(total_amount);
        calculatingBasketAmount();
     });
     calculatingBasketAmount();
});