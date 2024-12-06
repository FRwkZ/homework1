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
from django.contrib.auth.hashers import check_password
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


# 登录API
class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"error": "用户名和密码不能为空"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(username=username)
            if check_password(password, user.password):  # 检查密码是否正确
                return Response({"message": "登录成功"}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": "密码错误"}, status=status.HTTP_401_UNAUTHORIZED
                )
        except User.DoesNotExist:
            return Response({"error": "用户不存在"}, status=status.HTTP_404_NOT_FOUND)


# 消费API
class ComsumeAPIView(APIView):
    def put(self, request, bill_id):
        comsume = request.data.get("comsume")  # 获取传入数据
        bill = get_object_or_404(Bill, id=bill_id)
        for key, value in comsume.items():
            if key in bill.consumption:
                bill.consumption[key] += value
            else:
                bill.consumption[key] = value
        serializer = BillSerializer(bill)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 用户查询其订单API
class OrderByUserAPIView(APIView):
    def get(self, request, user_id):
        # 获取用户对象
        user = get_object_or_404(User, id=user_id)

        # 查询所有与该用户关联的订单
        orders = Order.objects.filter(booked_user=user)

        # 序列化订单数据
        serializer = OrderSerializer(orders, many=True)

        # 返回序列化数据
        return Response(serializer.data, status=status.HTTP_200_OK)


# 前台查询未被确定的订单API
class OrderByReceptionistAPIView(APIView):
    def get(self, request):
        # 查询所有未被确定的订单
        orders = Order.objects.filter(order_status=0)

        # 序列化订单数据
        serializer = OrderSerializer(orders, many=True)

        # 返回序列化数据
        return Response(serializer.data, status=status.HTTP_200_OK)


# 用户查询其已被确定的订单API
class OrderByUser_ReceptionistAPIView(APIView):
    def get(self, request, user_id):
        # 获取用户对象
        user = get_object_or_404(User, id=user_id)

        # 查询所有与该用户关联的订单
        orders = Order.objects.filter(booked_user=user).filter(order_status=1)

        # 序列化订单数据
        serializer = OrderSerializer(orders, many=True)

        # 返回序列化数据
        return Response(serializer.data, status=status.HTTP_200_OK)


# 结账API
class Check_outAPIView(APIView):
    def get(self, request, bill_id):
        # 获取账单
        bill = get_object_or_404(Bill, id=bill_id)
        temp = 1
        total_price = 0

        # 获取房间信息
        room = bill.room

        # 根据入住时间计算折扣
        if bill.check_in_time.hour > 20:
            temp = 0.7  # 晚上8点后入住的折扣
        elif bill.check_in_time.hour < 6:
            temp = 0.5  # 凌晨6点前入住的折扣

        # 计算房间费用
        if bill.festivaldiscount:
            total_price += (
                temp * bill.festivaldiscount.discount * room.discount * room.price
            )
        else:
            total_price += temp * room.discount * room.price

        # 计算消费费用
        for key, value in bill.consumption.items():
            commodity = get_object_or_404(Commodity, id=key)
            total_price += commodity.price * commodity.discount * value

        # 更新账单
        bill.total_price = total_price
        bill.finish_status = "finish"

        # 序列化并保存
        serializer = BillSerializer(bill)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
