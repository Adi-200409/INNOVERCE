import io
from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Registration


def create_test_image(name='test_screenshot.png', size=(100, 100), color='blue'):
    file_obj = io.BytesIO()
    image = Image.new('RGB', size=size, color=color)
    image.save(file_obj, format='PNG')
    file_obj.seek(0)
    return SimpleUploadedFile(name, file_obj.read(), content_type='image/png')


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
            "stream": "MCA",
            "utrNumber": "123456789012"
        }

    def test_successful_registration_multipart(self):
        payload = self.valid_payload.copy()
        payload['payment_screenshot'] = create_test_image('payment.png')
        response = self.client.post(
            reverse('register'),
            data=payload,
            format='multipart'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data.get('success'))
        self.assertIn('confirmationId', response.data)
        conf_id = response.data['confirmationId']
        self.assertEqual(conf_id, 'INN-3.0-001')

        # Check DB record
        reg = Registration.objects.get(confirmation_id=conf_id)
        self.assertEqual(reg.team_name, "CyberKnights")
        self.assertEqual(reg.stream, "MCA")
        self.assertEqual(reg.utr_number, "123456789012")
        self.assertTrue(bool(reg.payment_screenshot))
        self.assertEqual(reg.payment_status, "PENDING")

    def test_sequential_serial_confirmation_ids(self):
        # Register squad 1
        payload1 = self.valid_payload.copy()
        payload1['payment_screenshot'] = create_test_image('sq1.png')
        res1 = self.client.post(reverse('register'), data=payload1, format='multipart')
        self.assertEqual(res1.status_code, status.HTTP_200_OK)
        self.assertEqual(res1.data['confirmationId'], 'INN-3.0-001')

        # Register squad 2
        payload2 = self.valid_payload.copy()
        payload2['teamName'] = "AlphaSquad"
        payload2['payment_screenshot'] = create_test_image('sq2.png')
        res2 = self.client.post(reverse('register'), data=payload2, format='multipart')
        self.assertEqual(res2.status_code, status.HTTP_200_OK)
        self.assertEqual(res2.data['confirmationId'], 'INN-3.0-002')

        # Register squad 3
        payload3 = self.valid_payload.copy()
        payload3['teamName'] = "BetaSquad"
        payload3['payment_screenshot'] = create_test_image('sq3.png')
        res3 = self.client.post(reverse('register'), data=payload3, format='multipart')
        self.assertEqual(res3.status_code, status.HTTP_200_OK)
        self.assertEqual(res3.data['confirmationId'], 'INN-3.0-003')

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
            "stream": "bca",
            "utr_number": "987654321098",
            "payment_screenshot": create_test_image('receipt.jpg')
        }
        response = self.client.post(
            reverse('register'),
            data=payload,
            format='multipart'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Registration.objects.filter(team_name="CodeBreakers").exists())
        reg = Registration.objects.get(team_name="CodeBreakers")
        self.assertEqual(reg.stream, "BCA")
        self.assertEqual(reg.utr_number, "987654321098")
        self.assertTrue(bool(reg.payment_screenshot))

    def test_missing_utr_or_screenshot(self):
        incomplete_payload = self.valid_payload.copy()
        response = self.client.post(
            reverse('register'),
            data=incomplete_payload,
            format='multipart'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('payment_screenshot', response.data)

    def test_invalid_utr_regex(self):
        payload = self.valid_payload.copy()
        payload['utrNumber'] = '12345'  # only 5 digits
        payload['payment_screenshot'] = create_test_image()
        response = self.client.post(
            reverse('register'),
            data=payload,
            format='multipart'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('utr_number', response.data)

    def test_invalid_screenshot_type(self):
        payload = self.valid_payload.copy()
        fake_file = SimpleUploadedFile("receipt.pdf", b"fake pdf data", content_type="application/pdf")
        payload['payment_screenshot'] = fake_file
        response = self.client.post(
            reverse('register'),
            data=payload,
            format='multipart'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('payment_screenshot', response.data)

    def test_missing_required_fields(self):
        incomplete_payload = {
            "teamName": "IncompleteTeam"
        }
        response = self.client.post(
            reverse('register'),
            data=incomplete_payload,
            format='multipart'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('leader_name', response.data)
        self.assertIn('stream', response.data)

    def test_invalid_stream(self):
        invalid_payload = self.valid_payload.copy()
        invalid_payload['stream'] = 'BTECH'
        invalid_payload['payment_screenshot'] = create_test_image()
        response = self.client.post(
            reverse('register'),
            data=invalid_payload,
            format='multipart'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('stream', response.data)

    def test_retrieve_registration_detail(self):
        # Create a registration first
        payload = self.valid_payload.copy()
        payload['payment_screenshot'] = create_test_image()
        create_res = self.client.post(
            reverse('register'),
            data=payload,
            format='multipart'
        )
        conf_id = create_res.data['confirmationId']

        detail_res = self.client.get(reverse('registration-detail', kwargs={'confirmation_id': conf_id}))
        self.assertEqual(detail_res.status_code, status.HTTP_200_OK)
        self.assertEqual(detail_res.data['confirmation_id'], conf_id)
        self.assertEqual(detail_res.data['team_name'], "CyberKnights")
        self.assertEqual(detail_res.data['utr_number'], "123456789012")

    def test_team_login_success_case_insensitive(self):
        payload = self.valid_payload.copy()
        payload['payment_screenshot'] = create_test_image()
        create_res = self.client.post(
            reverse('register'),
            data=payload,
            format='multipart'
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
