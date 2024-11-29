#backend/studyroom/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search_studyroom, name='search_studyroom'),
    path('attend/<int:reservation_id>', views.attend_studyroom, name='attend_studyroom'),
]