from django.contrib import admin
from .models import Subscription

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    """Админка для подписок"""
    list_display = ['user', 'subscription_type', 'status', 'start_date', 'end_date', 'amount', 'currency']
    list_filter = ['subscription_type', 'status', 'currency', 'created_at']
    search_fields = ['user__username', 'user__email']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']
