from django.urls import path
from . import views

urlpatterns = [
    path('', views.UserAnalyticsView.as_view(), name='user-analytics'),
    path('weekly/', views.weekly_stats, name='weekly-stats'),
    path('habits/<uuid:habit_id>/progress/', views.habit_progress, name='habit-progress'),
]
