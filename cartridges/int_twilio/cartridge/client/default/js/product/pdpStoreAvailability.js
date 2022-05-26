'use strict';

module.exports = {
    updateAttribute: function () {
        $('body').on('product:afterAttributeSelect', function (e, response) {
            if (response.data.product.available) {
                if ($('#addToCartDiv').hasClass('d-none')) {
                    $('#addToCartDiv').removeClass('d-none');
                    $('#addToNotifyDiv').addClass('d-none');
                }
            }
            if ($('.product-detail>.bundle-items').length) {
                response.container.data('pid', response.data.product.id);
                response.container.find('.product-id').text(response.data.product.id);
            } else if ($('.product-set-detail').eq(0)) {
                response.container.data('pid', response.data.product.id);
                response.container.find('.product-id').text(response.data.product.id);
            } else {
                $('.product-id').text(response.data.product.id);
                $('.product-detail:not(".bundle-item")').data('pid', response.data.product.id);
            }
        });
    },
    addToCart: function () {
        $('form.create-notification').submit(function (e) {
            e.preventDefault();
            $.spinner().start();
            var $form = $(this);
            var url = $form.attr('action');

            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: $form.serialize(),
                success: function (data) {
                    $('#phone').prop('disabled', true);
                    $('.add-to-notify').prop('disabled', true);
                    $('.twillioResponse').show();
                    if (data.success) {
                        $('.twillioResponse').html($('#messageSuccess').val());
                    } else {
                        $('.twillioResponse').html($('#messageFail').val());
                    }
                    $.spinner().stop();
                },
                error: function (err) {
                    $('.twillioResponse').show();
                    $('.twillioResponse').html($('#messageFail').val());
                    $.spinner().stop();
                }
            });
        });
    }
};
