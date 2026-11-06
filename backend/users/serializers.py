from rest_framework import serializers
from .models import Registration


class RegistrationSerializer(serializers.ModelSerializer):
    confirmation_id = serializers.CharField(read_only=True)
    confirmationId = serializers.CharField(source='confirmation_id', read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)

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
        }
        for camel, snake in camel_to_snake.items():
            if camel in data and snake not in data:
                data[snake] = data[camel]

        if 'stream' in data and isinstance(data['stream'], str):
            data['stream'] = data['stream'].strip().upper()

        return super().to_internal_value(data)

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
        return ret
