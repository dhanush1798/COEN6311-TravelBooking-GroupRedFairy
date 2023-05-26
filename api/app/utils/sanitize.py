import re

def sanitize_input(input_string):
	# Check if input is empty or None
	if not input_string:
		return None
	# Remove any leading or trailing whitespaces
	sanitized_string = input_string.strip()

	# Remove any HTML tags or special characters using regex
	sanitized_string = re.sub('<.*?>', '', sanitized_string)

	# Add any additional sanitization logic as per your requirements

	return sanitized_string