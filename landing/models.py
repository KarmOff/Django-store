from django.db import models


class Subscriber(models.Model):
    email = models.EmailField()
    printing_house = models.BooleanField()
    polygraphy = models.BooleanField()

    def __str__(self):
        return "%s %s %s" % (self.email, self.printing_house, self.polygraphy)

