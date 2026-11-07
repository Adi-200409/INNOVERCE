import random
import string
from django.db import models


def generate_confirmation_id():
    # Format: INN-3.0-XXXXXX (6 random digits)
    random_digits = ''.join(random.choices(string.digits, k=6))
    return f"INN-3.0-{random_digits}"


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
        help_text="Unique boarding pass / confirmation ID"
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

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Hackathon Registration'
        verbose_name_plural = 'Hackathon Registrations'

    def save(self, *args, **kwargs):
        if not self.confirmation_id:
            new_id = generate_confirmation_id()
            while Registration.objects.filter(confirmation_id=new_id).exists():
                new_id = generate_confirmation_id()
            self.confirmation_id = new_id
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.team_name} ({self.confirmation_id}) - {self.stream}"
