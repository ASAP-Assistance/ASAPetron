<?php
$apiKey = '$apiKey = getenv('OPENAI_API_KEY'); // Replace with your actual key

$request = json_decode(file_get_contents("php://input"), true);
$prompt = $request['prompt'] ?? '';

$data = [
    'model' => 'gpt-3.5-turbo',
    'messages' => [
        ['role' => 'user', 'content' => $prompt]
    ]
];

$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey,
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
