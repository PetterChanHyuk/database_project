#backend/settimetable/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('timetable/', views.get_timetable, name='get_timetable'),
] 