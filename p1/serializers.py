from rest_framework import serializers

from .models import User
from .models import Commodity
from .models import Room
from .models import Subbranch
from .models import Bill
from .models import Staff
from .models import Order
from .models import PersonInfo
from .models import FestivalDiscount


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class CommoditySerializer(serializers.ModelSerializer):
    class Meta:
        model = Commodity
        fields = "__all__"


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"


class SubbranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subbranch
        fields = "__all__"


class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = "__all__"


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class PersonInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonInfo
        fields = "__all__"


class FestivalDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = FestivalDiscount
        fields = "__all__"
