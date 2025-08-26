from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Создаем роутер для ViewSets
router = DefaultRouter()
router.register(r'groups', views.HabitGroupViewSet, basename='habit-group')
router.register(r'', views.HabitViewSet, basename='habit')

urlpatterns = [
    # Кастомные действия
    path('<uuid:habit_id>/complete/', views.complete_habit, name='complete-habit'),
    path('logs/', views.HabitLogListCreateView.as_view(), name='habit-logs'),
    path('', include(router.urls)),
]
