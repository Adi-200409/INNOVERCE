import csv
import os
from django.core.management.base import BaseCommand
from users.models import Registration


class Command(BaseCommand):
    help = "Export all registrations into an Excel-compatible CSV file"

    def add_arguments(self, parser):
        parser.add_argument(
            '--output',
            type=str,
            default='innoverse_registrations.csv',
            help='Output CSV file path (defaults to innoverse_registrations.csv)'
        )

    def handle(self, *args, **options):
        output_path = options['output']
        registrations = Registration.objects.all().order_by('id')
        total_count = registrations.count()

        if total_count == 0:
            self.stdout.write(self.style.WARNING("No registrations found in the database."))
            return

        with open(output_path, mode='w', newline='', encoding='utf-8-sig') as f:
            writer = csv.writer(f)
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

            for reg in registrations:
                file_name = reg.payment_screenshot.name if reg.payment_screenshot else ''
                excel_link = 'No File'
                if file_name:
                    # Provide an Excel hyperlink that opens in browser when server runs
                    url = f"http://localhost:8000/media/{file_name}"
                    excel_link = f'=HYPERLINK("{url}", "Click to View Image")'
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

        abs_path = os.path.abspath(output_path)
        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully exported {total_count} registration(s) to Excel CSV at: {abs_path}"
            )
        )
