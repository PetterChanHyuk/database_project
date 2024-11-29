#backend/resist/urls.py

from django.urls import path
from .views import select_classroom,select_classroom_2,start,get_latest_reservation
from .views import RegisterAPI, LoginAPI
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('select_classroom/', select_classroom),
    path('select_classroom_2/', select_classroom_2),
    path('start/', start),
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('get_latest_reservation/', get_latest_reservation)

]