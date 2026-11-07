from django.contrib import admin
from .models import Registration


@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = (
        'confirmation_id',
        'team_name',
        'leader_name',
        'leader_email',
        'leader_contact',
        'stream',
        'institution_name',
        'payment_status',
        'created_at'
    )
    list_filter = ('stream', 'payment_status', 'created_at')
    search_fields = (
        'confirmation_id',
        'team_name',
        'leader_name',
        'leader_email',
        'leader_contact',
        'institution_name'
    )
    readonly_fields = ('confirmation_id', 'created_at', 'updated_at')
