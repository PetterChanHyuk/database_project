# backend/resist/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

# User model
class User(AbstractUser):
    student_id = models.IntegerField(unique=True, null=True, blank=True)
    role = models.CharField(
        max_length=10,
        choices=[
            ('Admin', 'Admin'),
            ('Professor', 'Professor'),
            ('Student', 'Student')
        ],
        default='Student'
    )
    is_returned = models.BooleanField(default=False)

    def __str__(self):
        return self.username

# Classroom model
class Classroom(models.Model):
    room_id = models.CharField(max_length=50, primary_key=True)
    building_name = models.CharField(max_length=100, null=False, default="신공학관")
    room_number = models.IntegerField(null=False)
    capacity = models.IntegerField(default=1)
    is_checked = models.BooleanField(default=False)
    has_air_conditioning = models.BooleanField(default=False)
    has_lighting = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.building_name} {self.room_number}"

# Reservation model
class Reservation(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    applicant = models.ForeignKey(User, on_delete=models.CASCADE)
    tag_1 = models.CharField(max_length=50, blank=True, null=True)
    tag_2 = models.CharField(max_length=50, blank=True, null=True)
    custom_tag = models.CharField(max_length=50, blank=True, null=True)
    reservation_date = models.DateField(null=True, blank=True)
    start_time = models.DateTimeField(null=False)
    end_time = models.DateTimeField(null=False)
    attendees_count = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"Reservation for {self.classroom} by {self.applicant}"

# Course model
class Course(models.Model):
    course_id = models.CharField(max_length=50, primary_key=True)
    course_name = models.CharField(max_length=50, blank=True, null=True)
    professor_name = models.CharField(max_length=50, blank=True, null=True)
    tag_1 = models.CharField(max_length=50, blank=True, null=True)
    tag_2 = models.CharField(max_length=50, blank=True, null=True)
    custom_tag = models.CharField(max_length=50, blank=True, null=True)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    day_of_week = models.CharField(max_length=50, null=True, blank=True)
    start_time = models.DateTimeField(null=False)
    end_time = models.DateTimeField(null=False)

    def __str__(self):
        return f"Course {self.course_id} in {self.classroom}"

# TimeCheck model
class TimeCheck(models.Model):
    _1 = models.BooleanField(default=True)
    _1h = models.BooleanField(default=True)
    _2 = models.BooleanField(default=True)
    _2h = models.BooleanField(default=True)
    _3 = models.BooleanField(default=True)
    _3h = models.BooleanField(default=True)
    _4 = models.BooleanField(default=True)
    _4h = models.BooleanField(default=True)
    _5 = models.BooleanField(default=True)
    _5h = models.BooleanField(default=True)
    _6 = models.BooleanField(default=True)
    _6h = models.BooleanField(default=True)
    _7 = models.BooleanField(default=True)
    _7h = models.BooleanField(default=True)
    _8 = models.BooleanField(default=True)
    _8h = models.BooleanField(default=True)
    _9 = models.BooleanField(default=True)
    _9h = models.BooleanField(default=True)
    _10 = models.BooleanField(default=True)
    _10h = models.BooleanField(default=True)
    _11 = models.BooleanField(default=True)
    _11h = models.BooleanField(default=True)
    _12 = models.BooleanField(default=True)
    _12h = models.BooleanField(default=True)
    _13 = models.BooleanField(default=True)
    _13h = models.BooleanField(default=True)
    _14 = models.BooleanField(default=True)
    _14h = models.BooleanField(default=True)
