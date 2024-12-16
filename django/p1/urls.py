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
from .view2 import LoginAPIView
from .view2 import ComsumeAPIView
from .view2 import OrderByUserAPIView
from .view2 import OrderByUser_ReceptionistAPIView
from .view2 import OrderByReceptionistAPIView
from .view2 import SubbranchRoomsAPIView
from .view2 import SubbranchCommodityAPIView
from .view2 import SubbranchOrderAPIView
from .view2 import OrderPersonInfoAPIView
from .view2 import CheckFestivalDiscountAPIView
from .view2 import SubbranchBillAPIView
from .view2 import UserBillAPIView
from .view2 import Check_OutAPIView

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
    path("login/", LoginAPIView.as_view()),  # 配置登录路由
    path("Comsume/", ComsumeAPIView.as_view()),
    path("OrderByUser/", OrderByUserAPIView.as_view()),
    path("OrderByUser_Receptionist/", OrderByUser_ReceptionistAPIView.as_view()),
    path("OrderByReceptionist/", OrderByReceptionistAPIView.as_view()),
    path("SubbranchRooms/<int:subbranch_id>/", SubbranchRoomsAPIView.as_view()),
    path(
        "Subbranch-Commodity/<int:subbranch_id>/", SubbranchCommodityAPIView.as_view()
    ),
    path("Subbranch-Order/<int:subbranch_id>/", SubbranchOrderAPIView.as_view()),
    path("Subbranch-Bill/<int:subbranch_id>/", SubbranchBillAPIView.as_view()),
    path("Order-PersonInfo/<int:order_number>/", OrderPersonInfoAPIView.as_view()),
    path("check-festival-discount/", CheckFestivalDiscountAPIView.as_view()),
    path("User-Bill/<int:user_id>/", UserBillAPIView.as_view()),
    path("Check-Out/<int:bill_id>/", Check_OutAPIView.as_view()),
]
