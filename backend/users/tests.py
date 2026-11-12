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

    def test_team_login_success_case_insensitive(self):
        create_res = self.client.post(
            reverse('register'),
            data=self.valid_payload,
            format='json'
        )
        conf_id = create_res.data['confirmationId']

        login_res = self.client.post(
            reverse('team-login'),
            data={
                "leaderEmail": "ALEX@EXAMPLE.COM",
                "confirmationId": conf_id.lower(),
            },
            format='json'
        )
        self.assertEqual(login_res.status_code, status.HTTP_200_OK)
        self.assertTrue(login_res.data.get('success'))
        self.assertEqual(login_res.data['confirmationId'], conf_id)
        self.assertEqual(login_res.data['data']['team_name'], "CyberKnights")

    def test_team_login_invalid_credentials(self):
        self.client.post(
            reverse('register'),
            data=self.valid_payload,
            format='json'
        )
        login_res = self.client.post(
            reverse('team-login'),
            data={
                "leaderEmail": "alex@example.com",
                "confirmationId": "INN-3.0-000000",
            },
            format='json'
        )
        self.assertEqual(login_res.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(login_res.data.get('success'))

    def test_team_login_missing_fields(self):
        login_res = self.client.post(
            reverse('team-login'),
            data={"leaderEmail": "alex@example.com"},
            format='json'
        )
        self.assertEqual(login_res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(login_res.data.get('success'))

    def test_user_signup_and_login_flow(self):
        signup_res = self.client.post(
            reverse('user-signup'),
            data={
                "name": "Aditya Patil",
                "email": "Aditya@example.com",
                "password": "password123",
            },
            format='json'
        )
        self.assertEqual(signup_res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(signup_res.data.get('success'))
        self.assertEqual(signup_res.data['user']['email'], "aditya@example.com")

        # Duplicate email rejected
        dup_res = self.client.post(
            reverse('user-signup'),
            data={
                "name": "Aditya Again",
                "email": "aditya@example.com",
                "password": "password123",
            },
            format='json'
        )
        self.assertEqual(dup_res.status_code, status.HTTP_400_BAD_REQUEST)

        # Login succeeds
        login_res = self.client.post(
            reverse('user-login'),
            data={
                "email": "ADITYA@EXAMPLE.COM",
                "password": "password123",
            },
            format='json'
        )
        self.assertEqual(login_res.status_code, status.HTTP_200_OK)
        self.assertEqual(login_res.data['user']['name'], "Aditya Patil")

        # Wrong password rejected
        bad_res = self.client.post(
            reverse('user-login'),
            data={
                "email": "aditya@example.com",
                "password": "wrongpassword",
            },
            format='json'
        )
        self.assertEqual(bad_res.status_code, status.HTTP_401_UNAUTHORIZED)
