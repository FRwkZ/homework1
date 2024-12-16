from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.dateparse import parse_datetime
from django.shortcuts import get_object_or_404
from decimal import Decimal
from decimal import ROUND_HALF_UP

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
                return Response(                    
                    {
                        "message": "登录成功",
                        "role": user.role,
                        "id": user.id,
                        "branch_id": user.branch_id,
                    }, status=status.HTTP_200_OK)
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

#结账api
class Check_OutAPIView(APIView):
    def get(self, request, bill_id):
        # 获取账单
        bill = get_object_or_404(Bill, id=bill_id)
        total_price = Decimal(0)  # 总价格使用 Decimal 来保证精度

        # 获取房间信息
        room = bill.room

        # 根据入住时间计算折扣
        check_in_hour = bill.check_in_time.hour
        if check_in_hour > 20:
            temp = Decimal(0.7)  # 晚上8点后入住的折扣
        elif check_in_hour < 6:
            temp = Decimal(0.5)  # 凌晨6点前入住的折扣
        else:
            temp = Decimal(1.0)  # 不在折扣时间内的情况下默认不打折

        # 计算房间费用
        if bill.festivaldiscount:
            discount_multiplier = Decimal(bill.festivaldiscount.discount)
            room_discount = Decimal(room.discount)
            room_price = Decimal(room.price)
            total_price += temp * discount_multiplier * room_discount * room_price
        else:
            total_price += temp * Decimal(room.discount) * Decimal(room.price)

        # 计算消费费用
        if bill.consumption:
            for key, value in bill.consumption.items():
                commodity = get_object_or_404(Commodity, id=key)
                commodity_price = Decimal(commodity.price)
                commodity_discount = Decimal(commodity.discount)
                total_price += commodity_price * commodity_discount * Decimal(value)

        # 确保总价为保留两位小数
        total_price = total_price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)

        # 更新账单
        bill.total_price = total_price
        bill.payment_status = "paid"  # 标记为已完成
        bill.save()  # 保存账单

        # 序列化并返回账单信息
        serializer = BillSerializer(bill)
        return Response(serializer.data, status=status.HTTP_200_OK)

#分店id查询对应房间
class SubbranchRoomsAPIView(APIView):
    def get(self, request, subbranch_id):
        # 确保分店存在
        subbranch = get_object_or_404(Subbranch, id=subbranch_id)

        # 查询未被占用的房间
        rooms = Room.objects.filter(subbranch_id=subbranch_id, is_occupied=False)

        # 创建一个包含房间信息的列表
        room_data = [{"id": room.id, "roomtype": room.roomtype} for room in rooms]

        return Response(room_data, status=status.HTTP_200_OK)

class SubbranchCommodityAPIView(APIView):
    def get(self, request, subbranch_id):
        # 确保分店存在
        subbranch = get_object_or_404(Subbranch, id=subbranch_id)

        # 分店对应的商品
        commodities = Commodity.objects.filter(subbranch_id=subbranch_id)

        # 创建一个包含商品信息的列表
        commodity_sim = [
            {
                "id": c.id,
                "commodityname": c.Commodityname,
                "price": c.price,
            }  # 使用商品对象的属性来构建字典
            for c in commodities
        ]

        return Response(commodity_sim, status=status.HTTP_200_OK)

class SubbranchOrderAPIView(APIView):
    def get(self, request, subbranch_id):
        # 确保分店存在
        subbranch = get_object_or_404(Subbranch, id=subbranch_id)

        # 分店对应的商品
        orders = Order.objects.filter(subbranch_id=subbranch_id)

        # 创建一个包含order信息的列表
        order_sim = [
            {
                "order_id": c.order_number,
                "user_id": c.booked_user.id,
                "order_status": c.order_status,
            }  # 使用order对象的属性来构建字典
            for c in orders
        ]

        return Response(order_sim, status=status.HTTP_200_OK)

# 根据分店id查询对应账单
class SubbranchBillAPIView(APIView):
    def get(self, request, subbranch_id):
        # 确保分店存在
        subbranch = get_object_or_404(Subbranch, id=subbranch_id)

        # 分店对应的账单
        bills = Bill.objects.filter(subbranch_id=subbranch_id)

        # 创建一个包含账单信息的列表
        bill_sim = [
            {
                "id": c.id,
                "userid": c.userid.id,
                "finish_status": c.finish_status,
            }  # 使用账单对象的属性来构建字典
            for c in bills
        ]

        return Response(bill_sim, status=status.HTTP_200_OK)


# 根据订单id查询预定人员信息
class OrderPersonInfoAPIView(APIView):
    def get(self, request, order_number):
        # 确保订单存在
        order = get_object_or_404(Order, order_number=order_number)

        # 订单对应人员
        persons = PersonInfo.objects.filter(order_id=order_number)
        serializer = PersonInfoSerializer(persons, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

# 判断节日优惠api
class CheckFestivalDiscountAPIView(APIView):
    def post(self, request):
        # 获取输入日期
        date_str = request.data.get("date")
        if not date_str:
            return Response(
                {"error": "Please provide a date."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # 将输入日期解析为 datetime 对象
            input_date = parse_datetime(date_str)
            if not input_date:
                raise ValueError("Invalid date format.")
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # 查询是否有节日优惠包含该日期
        discount = FestivalDiscount.objects.filter(
            start_time__lte=input_date, end_time__gte=input_date
        ).first()

        if discount:
            return Response(
                {"festival_discount_id": discount.id}, status=status.HTTP_200_OK
            )
        else:
            return Response({"festival_discount_id": None}, status=status.HTTP_200_OK)


class UserBillAPIView(APIView):
    def get(self, request, user_id):
        # 确保用户存在
        try:
            bills = Bill.objects.filter(userid=user_id)
        except Bill.DoesNotExist:
            return Response(
                {"error": "没有找到该用户的账单信息"}, status=status.HTTP_404_NOT_FOUND
            )

        # 使用序列化器来返回账单信息
        serializer = BillSerializer(bills, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)