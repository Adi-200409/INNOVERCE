import os
import re
from rest_framework import serializers
from .models import Registration


class RegistrationSerializer(serializers.ModelSerializer):
    confirmation_id = serializers.CharField(read_only=True)
    confirmationId = serializers.CharField(source='confirmation_id', read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    utr_number = serializers.CharField(
        max_length=12,
        required=True,
        error_messages={
            'required': '12-digit UTR / Transaction ID is required.',
            'blank': '12-digit UTR / Transaction ID cannot be blank.',
            'max_length': 'UTR / Transaction ID cannot exceed 12 digits.'
        }
    )
    payment_screenshot = serializers.ImageField(
        required=True,
        error_messages={
            'required': 'Payment screenshot is required.',
            'invalid_image': 'Upload a valid image. The file you uploaded was either not an image or a corrupted image.'
        }
    )

    class Meta:
        model = Registration
        fields = [
            'id',
            'confirmation_id',
            'confirmationId',
            'team_name',
            'leader_name',
            'leader_email',
            'leader_contact',
            'member1_name',
            'member2_name',
            'institution_name',
            'college_address',
            'stream',
            'member1_email',
            'member2_email',
            'domain',
            'payment_status',
            'utr_number',
            'payment_screenshot',
            'created_at',
            'createdAt',
        ]
        read_only_fields = ['id', 'confirmation_id', 'confirmationId', 'created_at', 'createdAt']

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)
        camel_to_snake = {
            'teamName': 'team_name',
            'leaderName': 'leader_name',
            'leaderEmail': 'leader_email',
            'leaderContact': 'leader_contact',
            'member1Name': 'member1_name',
            'member2Name': 'member2_name',
            'institutionName': 'institution_name',
            'collegeAddress': 'college_address',
            'member1Email': 'member1_email',
            'member2Email': 'member2_email',
            'paymentStatus': 'payment_status',
            'utrNumber': 'utr_number',
            'utr': 'utr_number',
            'paymentScreenshot': 'payment_screenshot',
            'screenshot': 'payment_screenshot',
        }
        for camel, snake in camel_to_snake.items():
            if camel in data and snake not in data:
                data[snake] = data[camel]

        if 'stream' in data and isinstance(data['stream'], str):
            data['stream'] = data['stream'].strip().upper()

        return super().to_internal_value(data)

    def validate_utr_number(self, value):
        val = str(value or '').strip()
        if not re.match(r'^\d{12}$', val):
            raise serializers.ValidationError("UTR / Transaction ID must be exactly 12 digits.")
        return val

    def validate_payment_screenshot(self, value):
        if not value:
            raise serializers.ValidationError("Payment screenshot is required.")
        # Size limit: 5MB (5 * 1024 * 1024 bytes)
        max_size = 5 * 1024 * 1024
        if value.size > max_size:
            raise serializers.ValidationError("Payment screenshot file size must not exceed 5MB.")

        ext = os.path.splitext(value.name)[1].lower()
        allowed_extensions = ['.jpg', '.jpeg', '.png']
        if ext not in allowed_extensions:
            raise serializers.ValidationError("Accepted screenshot file types are .jpg, .jpeg, and .png.")

        if hasattr(value, 'content_type') and value.content_type:
            allowed_mime_types = ['image/jpeg', 'image/png', 'image/pjpeg']
            if value.content_type.lower() not in allowed_mime_types:
                raise serializers.ValidationError("Invalid image type. Accepted types are JPG and PNG.")

        return value

    def validate_stream(self, value):
        stream_val = value.strip().upper()
        if stream_val not in ['BCA', 'MCA']:
            raise serializers.ValidationError("Stream must be either BCA or MCA.")
        return stream_val

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Also provide camelCase fields in output representation for convenience
        ret['teamName'] = instance.team_name
        ret['leaderName'] = instance.leader_name
        ret['leaderEmail'] = instance.leader_email
        ret['leaderContact'] = instance.leader_contact
        ret['member1Name'] = instance.member1_name
        ret['member2Name'] = instance.member2_name
        ret['institutionName'] = instance.institution_name
        ret['collegeAddress'] = instance.college_address
        ret['paymentStatus'] = instance.payment_status
        ret['utrNumber'] = instance.utr_number
        ret['paymentScreenshot'] = instance.payment_screenshot.url if instance.payment_screenshot else None
        return ret
