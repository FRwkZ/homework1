from django.contrib import admin

from .models import User
from .models import Commodity
from .models import Room
from .models import Subbranch
from .models import Bill
from .models import Staff
from .models import Order
from .models import PersonInfo
from .models import FestivalDiscount

# Register your models here.

admin.site.register(User)
admin.site.register(Commodity)
admin.site.register(Room)
admin.site.register(Subbranch)
admin.site.register(Bill)
admin.site.register(Staff)
admin.site.register(Order)
admin.site.register(PersonInfo)
admin.site.register(FestivalDiscount)
