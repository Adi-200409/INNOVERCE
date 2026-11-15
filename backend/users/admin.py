import csv
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path
from django.utils.html import format_html
from .models import Registration


def build_csv_export(queryset, filename="innoverse_registrations.csv", request=None):
    """
    Build an Excel-compatible CSV file (with utf-8-sig BOM) containing
    all registration details with clickable Excel hyperlinks.
    """
    response = HttpResponse(content_type='text/csv; charset=utf-8-sig')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'

    writer = csv.writer(response)
    writer.writerow([
        'Confirmation ID',
        'Team Name',
        'Stream',
        'Domain / Sector Focus',
        'Leader Name',
        'Leader Email',
        'Leader Contact',
        'Member 1 Name',
        'Member 1 Email',
        'Member 2 Name',
        'Member 2 Email',
        'Institution / College Name',
        'College Address',
        'Payment Status',
        'UPI / UTR Number',
        'Payment Screenshot (Clickable Link)',
        'Payment Screenshot (File Name)',
        'Registered At (UTC)',
    ])

    for reg in queryset:
        screenshot_url = ''
        file_name = ''
        excel_link = 'No File'

        if reg.payment_screenshot:
            file_name = reg.payment_screenshot.name
            try:
                screenshot_url = request.build_absolute_uri(reg.payment_screenshot.url) if request else reg.payment_screenshot.url
                # Excel HYPERLINK formula enables 1-click opening directly from Excel
                excel_link = f'=HYPERLINK("{screenshot_url}", "Click to View Image")'
            except Exception:
                screenshot_url = str(reg.payment_screenshot)
                excel_link = screenshot_url

        utr_val = str(reg.utr_number or '')

        writer.writerow([
            reg.confirmation_id,
            reg.team_name,
            reg.stream,
            reg.domain or '',
            reg.leader_name,
            reg.leader_email,
            reg.leader_contact,
            reg.member1_name,
            reg.member1_email or '',
            reg.member2_name,
            reg.member2_email or '',
            reg.institution_name,
            reg.college_address,
            reg.payment_status,
            utr_val,
            excel_link,
            file_name,
            reg.created_at.strftime('%Y-%m-%d %H:%M:%S') if reg.created_at else '',
        ])

    return response


@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = (
        'confirmation_id',
        'team_name',
        'leader_name',
        'leader_contact',
        'stream',
        'utr_number',
        'screenshot_thumbnail',
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
        'utr_number',
        'institution_name'
    )
    readonly_fields = ('confirmation_id', 'screenshot_preview', 'created_at', 'updated_at')
    actions = ['export_as_excel']

    @admin.display(description="Screenshot")
    def screenshot_thumbnail(self, obj):
        if obj.payment_screenshot:
            return format_html(
                '<a href="{0}" target="_blank">'
                '<img src="{0}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2);" />'
                '</a>',
                obj.payment_screenshot.url
            )
        return format_html('<span style="color: #888;">No Image</span>')

    @admin.display(description="Payment Screenshot Preview")
    def screenshot_preview(self, obj):
        if obj.payment_screenshot:
            return format_html(
                '<div style="margin-bottom: 8px;">'
                '<a href="{0}" target="_blank">'
                '<img src="{0}" style="max-width: 450px; max-height: 450px; border-radius: 8px; border: 1px solid #444; box-shadow: 0 4px 12px rgba(0,0,0,0.3);" />'
                '</a>'
                '</div>'
                '<a href="{0}" target="_blank" style="display: inline-block; padding: 6px 12px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold;">'
                '🔍 Open Full Resolution Image'
                '</a>',
                obj.payment_screenshot.url
            )
        return "No payment screenshot uploaded."

    @admin.action(description="📥 Export selected registrations to Excel (CSV)")
    def export_as_excel(self, request, queryset):
        return build_csv_export(queryset, filename="innoverse_registrations_selected.csv", request=request)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('export-all-excel/', self.admin_site.admin_view(self.export_all_excel_view), name='users_registration_export_all'),
        ]
        return custom_urls + urls

    def export_all_excel_view(self, request):
        """Direct 1-click download URL for all registrations"""
        queryset = self.get_queryset(request).order_by('id')
        return build_csv_export(queryset, filename="innoverse_all_registrations.csv", request=request)


