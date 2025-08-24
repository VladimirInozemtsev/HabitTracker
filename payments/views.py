from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.utils import timezone
from .models import Subscription
from .serializers import SubscriptionSerializer

# Create your views here.

class SubscriptionViewSet(viewsets.ModelViewSet):
    """ViewSet для подписок"""
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_subscription(request):
    """Текущая активная подписка пользователя"""
    try:
        subscription = Subscription.objects.filter(
            user=request.user,
            status='active',
            end_date__gte=timezone.now()
        ).latest('created_at')
        
        serializer = SubscriptionSerializer(subscription)
        return Response(serializer.data)
    except Subscription.DoesNotExist:
        return Response({
            'subscription_type': 'free',
            'status': 'active',
            'message': 'Бесплатная подписка'
        })

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def cancel_subscription(request, subscription_id):
    """Отмена подписки"""
    try:
        subscription = Subscription.objects.get(
            id=subscription_id,
            user=request.user,
            status='active'
        )
        
        subscription.status = 'cancelled'
        subscription.save()
        
        return Response({
            'message': 'Подписка отменена',
            'subscription_id': subscription.id
        })
    except Subscription.DoesNotExist:
        return Response(
            {'error': 'Подписка не найдена'}, 
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def subscription_features(request):
    """Доступные функции по типу подписки"""
    user = request.user
    
    # Определяем текущий уровень подписки
    try:
        active_subscription = Subscription.objects.filter(
            user=user,
            status='active',
            end_date__gte=timezone.now()
        ).latest('created_at')
        subscription_type = active_subscription.subscription_type
    except Subscription.DoesNotExist:
        subscription_type = 'free'
    
    # Функции по уровням подписки
    features = {
        'free': {
            'max_habits': 5,
            'max_groups': 2,
            'analytics': False,
            'export': False,
            'family_sharing': False,
            'priority_support': False,
            'custom_themes': False,
        },
        'premium': {
            'max_habits': 50,
            'max_groups': 10,
            'analytics': True,
            'export': True,
            'family_sharing': False,
            'priority_support': False,
            'custom_themes': True,
        },
        'family': {
            'max_habits': 200,
            'max_groups': 50,
            'analytics': True,
            'export': True,
            'family_sharing': True,
            'priority_support': True,
            'custom_themes': True,
        }
    }
    
    return Response({
        'subscription_type': subscription_type,
        'features': features[subscription_type],
        'upgrade_available': subscription_type != 'family'
    })
