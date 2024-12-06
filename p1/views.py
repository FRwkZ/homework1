from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import (
    User,
    Commodity,
    Room,
    Subbranch,
    Bill,
    Staff,
    Order,
    PersonInfo,
    FestivalDiscount,
)
from .serializers import (
    UserSerializer,
    CommoditySerializer,
    RoomSerializer,
    SubbranchSerializer,
    BillSerializer,
    StaffSerializer,
    OrderSerializer,
    PersonInfoSerializer,
    FestivalDiscountSerializer,
)

# Create your views here.


# User的方法
class UserAPIView(APIView):

    # 获取单个用户或所有用户
    def get(self, request, user_id=None):
        if user_id:
            user = get_object_or_404(User, id=user_id)
            serializer = UserSerializer(user)
        else:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 创建新用户
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 更新用户信息
    def put(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 部分更新用户信息（只更新提供的数据）
    def patch(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 删除用户
    def delete(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Commodity方法
class CommodityAPIView(APIView):

    # 获取单个商品或所有商品
    def get(self, request, commodity_id=None):
        if commodity_id:
            commodity = get_object_or_404(Commodity, id=commodity_id)
            serializer = CommoditySerializer(commodity)
        else:
            commoditys = Commodity.objects.all()
            serializer = CommoditySerializer(commoditys, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 创建新商品
    def post(self, request):
        serializer = CommoditySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 更新商品信息
    def put(self, request, commodity_id):
        commodity = get_object_or_404(Commodity, id=commodity_id)
        serializer = CommoditySerializer(commodity, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 部分更新商品信息（只更新提供的数据）
    def patch(self, request, commodity_id):
        commodity = get_object_or_404(Commodity, id=commodity_id)
        serializer = CommoditySerializer(commodity, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 删除商品
    def delete(self, request, commodity_id):
        commodity = get_object_or_404(Commodity, id=commodity_id)
        commodity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Room方法
class RoomAPIView(APIView):

    # 获取单个房间或所有房间
    def get(self, request, room_id=None):
        if room_id:
            room = get_object_or_404(Room, id=room_id)
            serializer = RoomSerializer(room)
        else:
            rooms = Room.objects.all()
            serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 创建新房间
    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 更新房间信息
    def put(self, request, room_id):
        room = get_object_or_404(Room, id=room_id)
        serializer = RoomSerializer(room, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 部分更新房间信息（只更新提供的数据）
    def patch(self, request, room_id):
        room = get_object_or_404(Room, id=room_id)
        serializer = RoomSerializer(room, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 删除房间
    def delete(self, request, room_id):
        room = get_object_or_404(Room, id=room_id)
        room.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Surbbanch方法
class SubbranchAPIView(APIView):

    # 获取单个分店或所有分店
    def get(self, request, subbranch_id=None):
        if subbranch_id:
            subbranch = get_object_or_404(Subbranch, id=subbranch_id)
            serializer = SubbranchSerializer(subbranch)
        else:
            subbranches = Subbranch.objects.all()
            serializer = SubbranchSerializer(subbranches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 创建新分店
    def post(self, request):
        serializer = SubbranchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 更新分店信息
    def put(self, request, subbranch_id):
        subbranch = get_object_or_404(Subbranch, id=subbranch_id)
        serializer = SubbranchSerializer(subbranch, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 部分更新分店信息（只更新提供的数据）
    def patch(self, request, subbranch_id):
        subbranch = get_object_or_404(Subbranch, id=subbranch_id)
        serializer = SubbranchSerializer(subbranch, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 删除分店
    def delete(self, request, subbranch_id):
        subbranch = get_object_or_404(Subbranch, id=subbranch_id)
        subbranch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# staff方法
class StaffAPIView(APIView):

    # 获取单个员工或所有员工
    def get(self, request, staff_id=None):
        if staff_id:
            staff = get_object_or_404(Staff, id=staff_id)
            serializer = StaffSerializer(staff)
        else:
            staff_members = Staff.objects.all()
            serializer = StaffSerializer(staff_members, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 创建新员工
    def post(self, request):
        serializer = StaffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 更新员工信息
    def put(self, request, staff_id):
        staff = get_object_or_404(Staff, id=staff_id)
        serializer = StaffSerializer(staff, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 部分更新员工信息（只更新提供的数据）
    def patch(self, request, staff_id):
        staff = get_object_or_404(Staff, id=staff_id)
        serializer = StaffSerializer(staff, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 删除员工
    def delete(self, request, staff_id):
        staff = get_object_or_404(Staff, id=staff_id)
        staff.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# peosoninfo方法
class PersonInfoAPIView(APIView):

    # 获取单个人员信息或所有人员信息
    def get(self, request, id_card=None):
        if id_card:
            person_info = get_object_or_404(PersonInfo, id_card=id_card)
            serializer = PersonInfoSerializer(person_info)
        else:
            persons_info = PersonInfo.objects.all()
            serializer = PersonInfoSerializer(persons_info, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 创建新的人员信息
    def post(self, request):
        serializer = PersonInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 更新人员信息
    def put(self, request, id_card):
        person_info = get_object_or_404(PersonInfo, id_card=id_card)
        serializer = PersonInfoSerializer(person_info, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 部分更新人员信息（只更新提供的数据）
    def patch(self, request, id_card):
        person_info = get_object_or_404(PersonInfo, id_card=id_card)
        serializer = PersonInfoSerializer(person_info, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 删除人员信息
    def delete(self, request, id_card):
        person_info = get_object_or_404(PersonInfo, id_card=id_card)
        person_info.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# bill方法
class BillAPIView(APIView):
    # 获取一个或多个账单信息
    def get(self, request, bill_id=None):
        if bill_id:
            bill = get_object_or_404(Bill, id=bill_id)
            serializer = BillSerializer(bill)
        else:
            bills = Bill.objects.all()
            serializer = BillSerializer(bills, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 创建账单信息
    def post(self, request):
        serializer = BillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 修改账单信息
    def put(self, request, bill_id):
        bill = get_object_or_404(Bill, id=bill_id)
        serializer = BillSerializer(bill, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 部分修改账单信息
    def patch(self, request, bill_id):
        bill = get_object_or_404(Bill, id=bill_id)
        serializer = BillSerializer(bill, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 删除账单信息
    def delete(self, request, bill_id):
        bill = get_object_or_404(Bill, id=bill_id)
        bill.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# order方法
class OrderAPIView(APIView):
    # 获取一个或多个账单信息
    def get(self, request, order_id=None):
        if order_id:
            order = get_object_or_404(Order, order_number=order_id)
            serializer = OrderSerializer(order)
        else:
            orders = Order.objects.all()
            serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 创建账单信息
    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 修改账单信息
    def put(self, request, order_id):
        order = get_object_or_404(Order, order_number=order_id)
        serializer = BillSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 部分修改账单信息
    def patch(self, request, order_id):
        order = get_object_or_404(Order, order_number=order_id)
        serializer = BillSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 删除账单信息
    def delete(self, request, order_id):
        order = get_object_or_404(Order, order_number=order_id)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# 节日折扣API
class FestivalDiscountAPIView(APIView):

    # 获取单个节日折扣或所有节日折扣
    def get(self, request, discount_id=None):
        if discount_id:
            festival_discount = get_object_or_404(FestivalDiscount, id=discount_id)
            serializer = FestivalDiscountSerializer(festival_discount)
        else:
            festival_discounts = FestivalDiscount.objects.all()
            serializer = FestivalDiscountSerializer(festival_discounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 创建新的节日折扣
    def post(self, request):
        serializer = FestivalDiscountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 更新节日折扣
    def put(self, request, discount_id):
        festival_discount = get_object_or_404(FestivalDiscount, id=discount_id)
        serializer = FestivalDiscountSerializer(festival_discount, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 部分更新节日折扣（只更新提供的数据）
    def patch(self, request, discount_id):
        festival_discount = get_object_or_404(FestivalDiscount, id=discount_id)
        serializer = FestivalDiscountSerializer(
            festival_discount, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 删除节日折扣
    def delete(self, request, discount_id):
        festival_discount = get_object_or_404(FestivalDiscount, id=discount_id)
        festival_discount.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
