from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Registration


class RegistrationAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.valid_payload = {
            "teamName": "CyberKnights",
            "leaderName": "Alex Mercer",
            "leaderEmail": "alex@example.com",
            "leaderContact": "9876543210",
            "member1Name": "Bruce Wayne",
            "member2Name": "Clark Kent",
            "institutionName": "KLS GIT Belagavi",
            "collegeAddress": "Udyambag, Belagavi, Karnataka",
            "stream": "MCA"
        }

    def test_successful_registration_camel_case(self):
        response = self.client.post(
            reverse('register'),
            data=self.valid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data.get('success'))
        self.assertIn('confirmationId', response.data)
        conf_id = response.data['confirmationId']
        self.assertTrue(conf_id.startswith('INN-3.0-'))

        # Check DB record
        reg = Registration.objects.get(confirmation_id=conf_id)
        self.assertEqual(reg.team_name, "CyberKnights")
        self.assertEqual(reg.stream, "MCA")
        self.assertEqual(reg.payment_status, "PENDING")

    def test_successful_registration_snake_case(self):
        payload = {
            "team_name": "CodeBreakers",
            "leader_name": "Diana Prince",
            "leader_email": "diana@example.com",
            "leader_contact": "9123456780",
            "member1_name": "Barry Allen",
            "member2_name": "Arthur Curry",
            "institution_name": "GIT MCA",
            "college_address": "Belagavi",
            "stream": "bca"
        }
        response = self.client.post(
            reverse('register'),
            data=payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Registration.objects.filter(team_name="CodeBreakers").exists())
        reg = Registration.objects.get(team_name="CodeBreakers")
        self.assertEqual(reg.stream, "BCA")

    def test_missing_required_fields(self):
        incomplete_payload = {
            "teamName": "IncompleteTeam"
        }
        response = self.client.post(
            reverse('register'),
            data=incomplete_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('leader_name', response.data)
        self.assertIn('stream', response.data)

    def test_invalid_stream(self):
        invalid_payload = self.valid_payload.copy()
        invalid_payload['stream'] = 'BTECH'
        response = self.client.post(
            reverse('register'),
            data=invalid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('stream', response.data)

    def test_retrieve_registration_detail(self):
        # Create a registration first
        create_res = self.client.post(
            reverse('register'),
            data=self.valid_payload,
            format='json'
        )
        conf_id = create_res.data['confirmationId']

        # Retrieve by confirmation ID
        detail_res = self.client.get(reverse('registration-detail', kwargs={'confirmation_id': conf_id}))
        self.assertEqual(detail_res.status_code, status.HTTP_200_OK)
        self.assertEqual(detail_res.data['confirmation_id'], conf_id)
        self.assertEqual(detail_res.data['team_name'], "CyberKnights")
