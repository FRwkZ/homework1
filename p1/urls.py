from django.urls import path

from . import views
from .views import UserAPIView
from .views import CommodityAPIView
from .views import RoomAPIView
from .views import SubbranchAPIView
from .views import StaffAPIView
from .views import PersonInfoAPIView
from .views import BillAPIView
from .views import OrderAPIView
from .views import FestivalDiscountAPIView

# 导入所有需要的视图

app_name = "p1"
urlpatterns = [
    path("user/", UserAPIView.as_view()),  # 获取所有用户或创建新用户
    path("user/<int:user_id>/", UserAPIView.as_view()),  # 获取、更新或删除单个用户
    path("commodity/", CommodityAPIView.as_view()),
    path("commodity/<int:commodity_id>/", CommodityAPIView.as_view()),
    path("room/", RoomAPIView.as_view()),
    path("room/<int:room_id>/", RoomAPIView.as_view()),
    path("subbranch/", SubbranchAPIView.as_view()),
    path("subbranch/<int:subbranch_id>/", SubbranchAPIView.as_view()),
    path("staff/", StaffAPIView.as_view()),
    path("staff/<int:staff_id>/", StaffAPIView.as_view()),
    path("personinfo/", PersonInfoAPIView.as_view()),
    path("personinfo/<str:id_card>/", PersonInfoAPIView.as_view()),
    path("bill/", BillAPIView.as_view()),
    path("bill/<int:bill_id>/", BillAPIView.as_view()),
    path("order/", OrderAPIView.as_view()),
    path("order/<int:order_id>/", OrderAPIView.as_view()),
    path("festival-discounts/", FestivalDiscountAPIView.as_view()),
    path("festival-discounts/<int:discount_id>/", FestivalDiscountAPIView.as_view()),
]
