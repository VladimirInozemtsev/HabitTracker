from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Создаем роутер для ViewSets
router = DefaultRouter()
router.register(r'subscriptions', views.SubscriptionViewSet, basename='subscription')

urlpatterns = [
    # Кастомные действия
    path('subscriptions/<uuid:subscription_id>/cancel/', views.cancel_subscription, name='cancel-subscription'),
    path('current/', views.current_subscription, name='current-subscription'),
    path('features/', views.subscription_features, name='subscription-features'),
    path('', include(router.urls)),
]
