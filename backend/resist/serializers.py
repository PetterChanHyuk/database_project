# serializers.py

from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Classroom, Reservation
from django.contrib.auth import get_user_model
# User 모델 시리얼라이저 (선택 사항)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'student_id', 'role')

# 회원가입 시리얼라이저
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'student_id', 'role')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            student_id=validated_data.get('student_id'),
            role=validated_data.get('role', 'Student')
        )
        return user

# 로그인 시리얼라이저
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("아이디 또는 비밀번호가 올바르지 않습니다.")

# Reservation 시리얼라이저
class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['classroom', 'applicant', 'tag_1', 'tag_2', 'custom_tag', 'reservation_date', 'start_time', 'end_time']

# Classroom 시리얼라이저
class ClassroomSerializer(serializers.ModelSerializer):
    reservation = ReservationSerializer(write_only=True)  # 예약 정보를 포함

    class Meta:
        model = Classroom
        fields = ['room_id', 'room_number', 'building_name', 'capacity', 'reservation']

    def create(self, validated_data):
        # 예약 정보를 추출
        reservation_data = validated_data.pop('reservation')
        classroom = Classroom.objects.create(**validated_data)

        # 예약 생성
        Reservation.objects.create(classroom=classroom, **reservation_data)
        return classroom
