from django.db import models
from datetime import timedelta

# Create your models here.


# 用户模型
class User(models.Model):
    ROLE_CHOICES = [
        ("customer", "客户"),
        ("receptionist", "前台"),
        ("manager", "店长"),
        ("admin", "管理员"),
    ]

    id = models.AutoField(primary_key=True)  # 用户编号
    username = models.CharField(max_length=50)  # 用户名
    password = models.CharField(max_length=50)  # 用户密码
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)  # 用户角色
    branch_id = models.IntegerField(
        null=True, blank=True
    )  # 当用户为前台或者店长时所属分店编号

    def __str__(self):
        return f"用户编号:{self.id},用户名:{self.username}"

    class Meta:
        db_table = "用户"


# 商品模型
class Commodity(models.Model):

    id = models.AutoField(primary_key=True)  # 商品编号
    Commodityname = models.CharField(max_length=50)  # 商品名称
    price = models.DecimalField(max_digits=10, decimal_places=2)  # 商品价格
    discount = models.DecimalField(
        max_digits=4, decimal_places=3, default=1
    )  # 商品折扣

    def __str__(self):
        return f"商品编号:{self.id},商品名称:{self.Commodityname}"

    class Meta:
        db_table = "商品"


# 节日折扣模型
class FestivalDiscount(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    discount = models.DecimalField(max_digits=3, decimal_places=2)

    class Meta:
        db_table = "节日折扣"

    def __str__(self):
        return f"节日:{self.name},折扣:{self.discount}"


# 分店模型
class Subbranch(models.Model):

    id = models.AutoField(primary_key=True)  # 分店编号
    name = models.CharField(max_length=50)  # 分店名称
    address = models.CharField(max_length=50)  # 分店地址

    def __str__(self):
        return f"分店编号:{self.id},分店名称:{self.name}"

    class Meta:
        db_table = "分店"


# 房间模型
class Room(models.Model):
    ROOM_CHOICES = [
        ("1", "标间"),
        ("2", "豪华标间"),
        ("3", "大床"),
        ("4", "豪华大床"),
        ("5", "行政"),
        ("6", "豪华行政"),
        ("7", "套房"),
    ]
    id = models.AutoField(primary_key=True)  # 编号
    roomtype = models.CharField(max_length=20, choices=ROOM_CHOICES)  # 房型
    price = models.DecimalField(max_digits=10, decimal_places=2)  # 价格
    discount = models.DecimalField(max_digits=4, decimal_places=3, default=1)  # 折扣
    area = models.DecimalField(max_digits=10, decimal_places=2)  # 面积
    max_number_of_guest = models.DecimalField(
        max_digits=10, decimal_places=2
    )  # 最大入住人数
    subbranch_id = models.ForeignKey(Subbranch, on_delete=models.CASCADE)
    is_occupied = models.BooleanField(default=False)  # 是否被占用，默认为 False

    def __str__(self):
        return f"房间编号:{self.id},房间型号:{self.roomtype}"

    class Meta:
        db_table = "房间"


# 账单模型
class Bill(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ("unpaid", "未支付"),
        ("paid", "已支付"),
    ]
    FINISH_STATUS_CHOICES = [
        ("finish", "已完成"),
        ("unfinish", "未完成"),
    ]
    id = models.AutoField(primary_key=True)  # 账单编号
    userid = models.ForeignKey(User, on_delete=models.CASCADE)  # 用户编号
    consumption = models.JSONField()  # 消费，以json格式存储{商品编号:消费数量}
    total_price = models.DecimalField(max_digits=10, decimal_places=2)  # 总价格
    room = models.ForeignKey(Room, on_delete=models.CASCADE)  # 房间编号
    check_in_time = models.DateTimeField()  # 入住时间
    check_out_time = models.DateTimeField()  # 退房时间
    number_of_guest = models.DecimalField(max_digits=3, decimal_places=0)  # 入住人数
    payment_status = models.CharField(
        max_length=10, choices=PAYMENT_STATUS_CHOICES, default="unpaid"
    )  # 支付状态
    finish_status = models.CharField(
        max_length=10, choices=FINISH_STATUS_CHOICES, default="unfinish"
    )  # 完成状态
    festivaldiscount = models.ForeignKey(
        FestivalDiscount, null=True, on_delete=models.CASCADE
    )  # 节日优惠，没有节日就为空

    def __str__(self):
        return f"账单编号:{self.id},消费者:{self.userid}"

    class Meta:
        db_table = "账单"


# 员工信息模型
class Staff(models.Model):
    SEX_CHOICES = [
        ("1", "男"),
        ("2", "女"),
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    id_card = models.CharField(max_length=50)  # 身份证
    sex = models.CharField(max_length=5, choices=SEX_CHOICES)
    position = models.CharField(max_length=50)
    age = models.DecimalField(max_digits=3, decimal_places=0)
    subbranch_id = models.ForeignKey(Subbranch, on_delete=models.CASCADE)

    def __str__(self):
        return f"员工编号:{self.id},姓名:{self.name}"

    class Meta:
        db_table = "员工信息"


# 订单模型
class Order(models.Model):
    ORDER_STATUS_CHOICES = [
        (0, "未完成"),  # 状态 0
        (1, "已完成"),  # 状态 1
    ]

    order_number = models.AutoField(primary_key=True)  # 自动递增的主键
    number_of_guests = models.IntegerField()  # 入住人数
    room_number = models.IntegerField()  # 房间编号
    check_in_date = models.DateTimeField()  # 入住日期
    check_out_date = models.DateTimeField()  # 退房日期
    booked_user = models.ForeignKey(User, on_delete=models.CASCADE)  # 外键指向用户
    order_status = models.IntegerField(
        choices=ORDER_STATUS_CHOICES, default=0
    )  # 订单状态，默认值为 0

    class Meta:
        db_table = "订单"  # 指定数据库表名
        constraints = [
            models.CheckConstraint(
                check=models.Q(order_status__in=[0, 1]), name="订单_状态_check"
            )
        ]

    def __str__(self):
        return f"订单编号: {self.order_number} - 预定用户: {self.booked_user.username}"


# 人员信息模型
class PersonInfo(models.Model):
    id_card = models.CharField(max_length=255, primary_key=True)  # 设置身份证为主键
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)

    class Meta:
        db_table = "人员信息"  # 指定表名

    def __str__(self):
        return self.name
