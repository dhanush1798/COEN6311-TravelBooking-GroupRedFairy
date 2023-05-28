import boto3
from botocore.exceptions import ClientError
from config import Config

def send_password_reset_email(user, token):
	# Create SES client
	ses = boto3.client('ses', region_name='us-east-2', aws_access_key_id=Config.SES_ACCESS_KEY_ID, aws_secret_access_key=Config.SES_SECRET_ACCESS_KEY)
	sender = 'Concordia Travel Support <{}>'.format(Config.SES_SENDER_EMAIL)
	recipients = [user.get_email()]
	subject = 'Password Reset Link for Concordia Travel'
	email_body = """
		<p>If you have not requested a password reset, please ignore this email.</p>
		<p>Otherwise, please click on the following link to reset your password:</p>
		<p><a href="{}/reset-password/{}">Reset Password</a></p>
		<p>Or copy and paste the following link in your browser:</p>
		<p>{}/reset-password/{}</p>
		<p>Thank you for traveling with Concordia Travel!</p>
	""".format(Config.FRONTEND_URL, token, Config.FRONTEND_URL, token)
	# Try to send email
	try:
		response = ses.send_email(
			Destination={
				'ToAddresses': recipients,
			},
			Message={
				'Body': {
					'Html': {
						'Charset': 'UTF-8',
						'Data': email_body,
					},
				},
				'Subject': {
					'Data': subject,
				},
			},
			Source=sender,
		)
		if response['ResponseMetadata']['HTTPStatusCode'] == 200:
			return True
		return False
	except ClientError as e:
		print(e.response['Error']['Message'])
		return False
