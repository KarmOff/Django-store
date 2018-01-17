from django.http import JsonResponse
from .models import ProductInBasket
from django.shortcuts import render

def basket_adding(request):
    return_dict = dict()
    session_key = request.session.session_key
    print(request.POST)
    data = request.POST
    product_id = data.get("product_id")
    count = data.get("count")
    is_delete = data.get("is_delete")
    if is_delete == 'true':
        ProductInBasket.objects.filter(id=product_id).update(is_active=False)
    else:
        new_product, created = ProductInBasket.objects.get_or_create(session_key=session_key, product_id=product_id, is_active=True, defaults={"count":count})
        if not created:
            new_product.count += int(count)
            new_product.save(force_update=True)

    #common code for 2 cases
    products_in_basket = ProductInBasket.objects.filter(session_key=session_key, is_active=True)
    product_total_count = products_in_basket.count()
    return_dict["product_total_count"] = product_total_count

    return_dict["products"] = list()

    for item in products_in_basket:
        product_dict = dict()
        product_dict['name'] = item.product.name
        product_dict['price_per_item'] = item.price_per_item
        product_dict['count'] = item.count
        product_dict['id'] = item.id
        return_dict["products"].append(product_dict)
    return JsonResponse(return_dict)


def checkout(request):
    product_in_basket = ProductInBasket.objects.filter(session_key = request.session.session_key, is_active=True)
    return render(request, 'orders/checkout.html', locals())

