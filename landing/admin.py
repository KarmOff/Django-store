from django.contrib import admin
from .models import *




class SubscriberAdmin (admin.ModelAdmin):
    # list_display = ["email", "printing_house", "polygraphy"]
    list_display = [field.name for field in Subscriber._meta.fields]
    # inlines = [fieldMappingInline]
    # fields = []
    # #exlude = ["type"]
    # #list_field = ('report_data',)
    search_fields = ["email"]

    class Meta:
        model = Subscriber

admin.site.register(Subscriber, SubscriberAdmin)