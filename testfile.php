<?php

$to = "test-i2j3c2yfo@srv1.mail-tester.com";
$from = "webmaster@imiko.ltd";
$subject = "test";
$message = "testmail";

$headers = "From: $from";
$ok = @mail($to, $subject, $message, $headers, "-f " . $from);

echo $ok;

?>

