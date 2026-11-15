import logging
from email.utils import formataddr, parseaddr
from django.conf import settings
from django.core.mail import EmailMultiAlternatives

logger = logging.getLogger(__name__)


def send_registration_confirmation_email(registration):
    """
    Sends a rich confirmation email to the squad leader upon successful registration for INNOVERSE 3.0.
    Includes:
      - Confirmation ID (serial format e.g. INN-3.0-001)
      - Login email ID
      - Direct squad login link
      - Official WhatsApp Group invite link for further updates
      - Event coordination and telemetry details
    """
    leader_email = (registration.leader_email or '').strip()
    if not leader_email:
        logger.warning(f"Registration {registration.id} has no leader email; skipping confirmation email.")
        return False, "No leader email provided"

    confirmation_id = registration.confirmation_id
    team_name = registration.team_name
    leader_name = registration.leader_name
    stream = registration.stream
    institution = registration.institution_name
    member1 = registration.member1_name
    member2 = registration.member2_name
    utr_number = getattr(registration, 'utr_number', '') or ''

    frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:5173').rstrip('/')
    login_url = f"{frontend_url}/login.html"
    whatsapp_url = getattr(
        settings,
        'WHATSAPP_GROUP_URL',
        'https://chat.whatsapp.com/GaEZLOprIum8Y0AXXyHuI3?s=sh&p=a&iam=2'
    )
    raw_from = getattr(settings, 'DEFAULT_FROM_EMAIL', '"INNOVERSE 3.0" <noreply@innoverse.git.edu>')
    from_name, from_addr = parseaddr(raw_from)
    from_email = formataddr((from_name or 'INNOVERSE 3.0', from_addr or 'noreply@innoverse.git.edu'))

    # Clean subject line without leading emojis or bracket characters that trigger automated spam filters
    subject = f"Registration Confirmed: Squad {team_name} ({confirmation_id}) - INNOVERSE 3.0"

    # Plain text version
    text_content = f"""
============================================================
INNOVERSE 3.0 • NATIONAL LEVEL HACKATHON
Department of MCA, KLS Gogte Institute of Technology, Belagavi
============================================================

Dear {leader_name},

Congratulations! Squad "{team_name}" has been successfully registered for INNOVERSE 3.0!
Your official registration and boarding pass details have been generated.

------------------------------------------------------------
SQUAD LOGIN CREDENTIALS
------------------------------------------------------------
• Confirmation ID: {confirmation_id}
• Registered Login Email: {leader_email}
• Competitive Stream: {stream}
• Squad Members: {leader_name} (Lead), {member1}, {member2}
• Institution: {institution}
{f'• UTR Reference: {utr_number}' if utr_number else ''}

------------------------------------------------------------
1. ACCESS SQUAD MISSION CONTROL (LOGIN)
------------------------------------------------------------
Access your team dashboard, view live telemetry, and re-download your digital boarding pass anytime:
{login_url}

(Log in using your Registered Email: {leader_email} and Confirmation ID: {confirmation_id})

------------------------------------------------------------
2. JOIN OFFICIAL WHATSAPP GROUP (IMPORTANT)
------------------------------------------------------------
All hackathon announcements, preliminary round evaluations, mentor guidelines, and flight schedules are published via the official squad WhatsApp channel. Join now:
{whatsapp_url}

------------------------------------------------------------
EVENT DETAILS & CONTACT
------------------------------------------------------------
• Venue: Department of MCA, KLS Gogte Institute of Technology, Belagavi – 590008
• Coordinators:
  - Vaishnavi Shivkale: +91 79751 11929
  - Aditya Belled: +91 76766 87006

See you at INNOVERSE 3.0!
    """.strip()

    # Rich Cyber-Themed HTML Version
    html_content = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050508; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #050508; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0d0d14; border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);">
          
          <!-- Banner / Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #181824 0%, #0d0d14 100%); padding: 32px 30px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
              <div style="display: inline-block; padding: 4px 14px; border-radius: 9999px; background-color: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.4); color: #fbbf24; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;">
                INNOVERSE 3.0 • LAUNCH PASS
              </div>
              <h1 style="margin: 0; font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; text-transform: uppercase;">
                Registration <span style="color: #f59e0b;">Confirmed</span>
              </h1>
              <p style="margin: 6px 0 0; font-size: 12px; color: #94a3b8; font-family: monospace;">
                KLS Gogte Institute of Technology • Department of MCA
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 30px;">
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #f1f5f9;">
                Hi <strong style="color: #f59e0b;">{leader_name}</strong>,
              </p>
              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: #cbd5e1;">
                Congratulations! Squad <strong style="color: #ffffff;">{team_name}</strong> is officially registered for <strong style="color: #f59e0b;">INNOVERSE 3.0</strong>. Your response and verification details have been recorded in our mission flight systems.
              </p>

              <!-- Credentials HUD Box -->
              <table role="presentation" width="100%" style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 14px; margin-bottom: 26px; padding: 18px 20px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 700; color: #fbbf24; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; font-family: monospace;">
                      // SQUAD MISSION CREDENTIALS
                    </div>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="4" style="font-size: 13px; color: #e2e8f0;">
                      <tr>
                        <td width="38%" style="color: #94a3b8; font-family: monospace;">Confirmation ID:</td>
                        <td>
                          <span style="display: inline-block; padding: 3px 10px; background-color: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 6px; color: #fbbf24; font-family: monospace; font-weight: 700; font-size: 14px;">
                            {confirmation_id}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #94a3b8; font-family: monospace;">Login Email:</td>
                        <td style="font-family: monospace; font-weight: 600; color: #38bdf8;">{leader_email}</td>
                      </tr>
                      <tr>
                        <td style="color: #94a3b8; font-family: monospace;">Stream Track:</td>
                        <td style="font-weight: 600; color: #ffffff;">{stream}</td>
                      </tr>
                      <tr>
                        <td style="color: #94a3b8; font-family: monospace;">Squad Squad:</td>
                        <td style="color: #cbd5e1;">{leader_name} (Lead), {member1}, {member2}</td>
                      </tr>
                      <tr>
                        <td style="color: #94a3b8; font-family: monospace;">Institution:</td>
                        <td style="color: #cbd5e1;">{institution}</td>
                      </tr>
                      {f'''<tr>
                        <td style="color: #94a3b8; font-family: monospace;">UTR Reference:</td>
                        <td style="font-family: monospace; color: #10b981;">{utr_number}</td>
                      </tr>''' if utr_number else ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action 1: Squad Login Button -->
              <table role="presentation" width="100%" style="margin-bottom: 22px;">
                <tr>
                  <td align="center">
                    <a href="{login_url}" target="_blank" style="display: block; width: 100%; max-width: 380px; padding: 14px 24px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000000; font-size: 13px; font-weight: 800; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 9999px; text-align: center; box-shadow: 0 0 25px rgba(245, 158, 11, 0.45);">
                      🚀 Access Squad Mission Control &rarr;
                    </a>
                    <div style="font-size: 11px; color: #94a3b8; margin-top: 6px; font-family: monospace;">
                      Log in anytime to view telemetry and download your boarding pass
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Action 2: WhatsApp Group Join Button -->
              <table role="presentation" width="100%" style="margin-bottom: 26px; background-color: rgba(37, 211, 102, 0.06); border: 1px solid rgba(37, 211, 102, 0.35); border-radius: 14px; padding: 16px 20px;">
                <tr>
                  <td align="center">
                    <div style="font-size: 12px; font-weight: 700; color: #25d366; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; font-family: monospace;">
                      📢 Mandatory Notification Channel
                    </div>
                    <p style="margin: 0 0 14px; font-size: 12px; color: #cbd5e1; line-height: 1.5; text-align: center;">
                      All hackathon announcements, preliminary review results, live demo schedules, and Discord/submission links will be released exclusively in the WhatsApp group.
                    </p>
                    <a href="{whatsapp_url}" target="_blank" style="display: inline-block; padding: 12px 28px; background-color: #25d366; color: #ffffff; font-size: 13px; font-weight: 700; font-family: -apple-system, BlinkMacSystemFont, sans-serif; text-decoration: none; border-radius: 9999px; text-align: center; box-shadow: 0 0 20px rgba(37, 211, 102, 0.35);">
                      💬 Join Official WhatsApp Community &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Event Ground Telemetry -->
              <div style="padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 12px; color: #94a3b8; line-height: 1.6;">
                <p style="margin: 0 0 6px;">
                  📍 <strong>Venue</strong>: Department of MCA, KLS Gogte Institute of Technology, Udyambag, Belagavi &ndash; 590008, Karnataka
                </p>
                <p style="margin: 0;">
                  📞 <strong>Student Coordinators</strong>: Vaishnavi Shivkale: <a href="tel:7975111929" style="color: #fbbf24; text-decoration: none;">79751 11929</a> | Aditya Belled: <a href="tel:7676687006" style="color: #fbbf24; text-decoration: none;">76766 87006</a>
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #07070b; padding: 18px 24px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 11px; color: #64748b; font-family: monospace;">
              &copy; INNOVERSE 3.0 &bull; Autonomous Institution affiliated to VTU Belagavi &bull; All Rights Reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    """.strip()

    try:
        msg = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=from_email,
            to=[leader_email],
            reply_to=[from_email]
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)
        logger.info(f"Confirmation email successfully dispatched to {leader_email} for squad {team_name} [{confirmation_id}].")
        return True, None
    except Exception as exc:
        logger.error(f"Failed to dispatch registration confirmation email to {leader_email}: {exc}", exc_info=True)
        return False, str(exc)
