<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

// If JSON decode fails, try regular POST data
if (!$input) {
    $input = $_POST;
}

// Validate required fields
$required_fields = ['name', 'email', 'message'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $errors[] = ucfirst($field) . ' is required';
    }
}

// Validate email format
if (!empty($input['email']) && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}

// Validate phone if provided
if (!empty($input['phone']) && !preg_match('/^[\+]?[0-9\s\-\(\)]{7,15}$/', $input['phone'])) {
    $errors[] = 'Invalid phone number format';
}

// Return validation errors
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $errors
    ]);
    exit;
}

// Sanitize input data
$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone = !empty($input['phone']) ? htmlspecialchars(trim($input['phone'])) : '';
$message = htmlspecialchars(trim($input['message']));

// Email configuration
$to = 'info@landingcraft.pro'; // Change this to your email
$subject = 'New Contact Form Submission - LandingCraft Pro';

// Create email content
$email_content = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #581EB8, #D811F0); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #581EB8; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 5px; border-left: 4px solid #D811F0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
            <p>LandingCraft Pro Website</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>{$name}</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>{$email}</div>
            </div>";

if (!empty($phone)) {
    $email_content .= "
            <div class='field'>
                <div class='label'>Phone:</div>
                <div class='value'>{$phone}</div>
            </div>";
}

$email_content .= "
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Submitted:</div>
                <div class='value'>" . date('Y-m-d H:i:s') . "</div>
            </div>
        </div>
    </div>
</body>
</html>";

// Email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: LandingCraft Pro <noreply@landingcraft.pro>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

// Try to send email
$mail_sent = mail($to, $subject, $email_content, implode("\r\n", $headers));

if ($mail_sent) {
    // Log successful submission (optional)
    $log_entry = date('Y-m-d H:i:s') . " - Contact form submission from: {$name} ({$email})\n";
    file_put_contents(__DIR__ . '/contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We will get back to you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again later.'
    ]);
}
?>
