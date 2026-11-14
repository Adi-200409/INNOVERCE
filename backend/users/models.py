import os
import re
import uuid
from django.db import models, transaction


def get_next_serial_confirmation_id():
    """
    Generate sequential confirmation IDs in the format:
    INN-3.0-001, INN-3.0-002, INN-3.0-003, ...
    """
    prefix = "INN-3.0-"
    existing_ids = Registration.objects.filter(
        confirmation_id__startswith=prefix
    ).values_list('confirmation_id', flat=True)

    max_serial = 0
    for cid in existing_ids:
        # Match only sequential numbers (e.g. 001, 002, 050, 100...)
        match = re.match(r'^INN-3\.0-(\d+)$', str(cid).strip())
        if match:
            try:
                num = int(match.group(1))
                # If old random 6-digit IDs exist (>90000), ignore them when determining next sequence
                if num < 90000 and num > max_serial:
                    max_serial = num
            except ValueError:
                continue

    next_serial = max_serial + 1
    return f"{prefix}{next_serial:03d}"


def payment_screenshot_upload_path(instance, filename):
    ext = os.path.splitext(filename)[1].lower()
    if ext not in ['.jpg', '.jpeg', '.png']:
        ext = '.png'
    safe_name = f"payment_{uuid.uuid4().hex[:12]}{ext}"
    return os.path.join('payment_screenshots', safe_name)


class Registration(models.Model):
    STREAM_CHOICES = [
        ('BCA', 'BCA'),
        ('MCA', 'MCA'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PAID', 'Paid'),
    ]

    confirmation_id = models.CharField(
        max_length=32,
        unique=True,
        editable=False,
        db_index=True,
        help_text="Unique boarding pass / sequential confirmation ID (e.g. INN-3.0-001)"
    )
    team_name = models.CharField(max_length=150)
    leader_name = models.CharField(max_length=150)
    leader_email = models.EmailField()
    leader_contact = models.CharField(max_length=20)
    member1_name = models.CharField(max_length=150)
    member2_name = models.CharField(max_length=150)
    institution_name = models.CharField(max_length=255)
    college_address = models.TextField()
    stream = models.CharField(max_length=10, choices=STREAM_CHOICES)

    # Optional / Extended fields
    member1_email = models.EmailField(blank=True, null=True)
    member2_email = models.EmailField(blank=True, null=True)
    domain = models.CharField(max_length=100, blank=True, null=True)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='PENDING')

    # UPI Payment verification fields
    utr_number = models.CharField(
        max_length=12,
        blank=True,
        default='',
        help_text="12-digit UPI Transaction ID / UTR"
    )
    payment_screenshot = models.ImageField(
        upload_to=payment_screenshot_upload_path,
        max_length=255,
        blank=True,
        null=True,
        help_text="Uploaded UPI payment screenshot"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Hackathon Registration'
        verbose_name_plural = 'Hackathon Registrations'

    def save(self, *args, **kwargs):
        if not self.confirmation_id:
            with transaction.atomic():
                new_id = get_next_serial_confirmation_id()
                # Ensure no race condition collision
                while Registration.objects.filter(confirmation_id=new_id).exists():
                    match = re.match(r'^INN-3\.0-(\d+)$', new_id)
                    next_val = int(match.group(1)) + 1 if match else 1
                    new_id = f"INN-3.0-{next_val:03d}"
                self.confirmation_id = new_id
                super().save(*args, **kwargs)
        else:
            super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.team_name} ({self.confirmation_id}) - {self.stream}"
