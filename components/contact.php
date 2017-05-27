<?php

	$default_error_message = "There was a problem sending your message, but please don't give up! We want to hear from you, so please try again.";

	// Only process POST requests
	if($_SERVER["REQUEST_METHOD"] == "POST") {
		// Get fields and remove whitespace
		$name = strip_tags(trim($_POST["name"]));
		$name = str_replace(array("\r", "\n"), array(" ", " "), $name);
		$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
		$message = trim($_POST["message"]);

		if(empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
			// Set a 400 (bad request) response code and exit
			http_response_code(400);
			echo $default_error_message;
			echo "Please make sure you have filled all fields correctly.";
			exit;
		}

		// Set recipient email address
		$recipient = "contact@l9kdesigns.com";

		// Set email subject
		$subject = "New message from $name";

		// Build content of email
		$email_content = "Name: $name\n";
		$email_content .= "Email: $email\n\n";
		$email_content .= "Message:\n$message\n";

		// Build email headers
		$email_headers = "From: $name <$email>";

		//Send the email
		if(mail($recipient, $subject, $email_content, $email_headers)) {
			// Set a 200 (okay) response code
			http_response_code(200);
			echo "Thank you for contacting us! Your message has been sent successfully!";
		} else {
			// Set a 500 (internal server error) response code
			http_response_code(500);
			echo $default_error_message;
		}

	} else {
		// Not a POST request, set a 403 (forbidden) response code
		http_response_code(403);
		echo $default_error_message;
	}


?>