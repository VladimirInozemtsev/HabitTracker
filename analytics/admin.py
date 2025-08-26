from django.contrib import admin
from .models import UserAnalytics

@admin.register(UserAnalytics)
class UserAnalyticsAdmin(admin.ModelAdmin):
    """Админка для аналитики пользователей"""
    list_display = ['user', 'total_days_active', 'last_active_date', 'created_at']
    list_filter = ['last_active_date', 'created_at']
    search_fields = ['user__username', 'user__email']
    ordering = ['-last_active_date']
    readonly_fields = ['created_at', 'updated_at']
