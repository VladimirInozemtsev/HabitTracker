from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Создаем роутер для ViewSets
router = DefaultRouter()
router.register(r'groups', views.HabitGroupViewSet, basename='habit-group')
router.register(r'', views.HabitViewSet, basename='habit')

urlpatterns = [
    # Кастомные действия
    path('archived/', views.archived_habits, name='archived-habits'),
    path('logs/', views.HabitLogListCreateView.as_view(), name='habit-logs'),
    path('<uuid:habit_id>/complete/', views.complete_habit, name='complete-habit'),
    path('<uuid:habit_id>/archive/', views.archive_habit, name='archive-habit'),
    path('<uuid:habit_id>/unarchive/', views.unarchive_habit, name='unarchive-habit'),
    path('<uuid:habit_id>/delete/', views.delete_habit, name='delete-habit'),
    path('', include(router.urls)),
]
