<?php
$formGo = $_POST["go"];

if($formGo) {

    // ===== Reference ============================
    $recaptchaOn = false; // true- включить рекаптчу; false- отключить рекаптчу
    if ($recaptchaOn) {
        $recaptcha = $_POST['g-recaptcha-response'];
    }
    if( isset($_POST["name"]) ) {
        $name = $_POST["name"];
    }
    if( isset($_POST["email"]) ) {
        $email = $_POST["email"];
    }
 
    if( isset($_POST["vacancy"]) ) {
        $vacancy = $_POST["vacancy"];
    }
    if( isset($_POST["comment"]) ) {
        $comment = $_POST["comment"];
    }

        
    // ===== Variables =====
    $to = "info@imiko.ltd"; // E-mail на который присылать письмо
    $fromEmail = "webmaster@imiko.ltd"; // E-mail от имени которого приходит письмо. Почта на домене сайта.
    $subject = "Form";

    if ( $formGo == 'callback' ) {
        $subject = "Contact form";
    }

    function adopt($text) {
        return '=?UTF-8?B?'.base64_encode($text).'?=';
    }

    $message  = '<html><body>';
    $message .= "<table>";
    
   
    if (!empty($name)) {
        $message .= "<tr>";
        $message .= "<td>";
        $message .= "<strong> Name: </strong>";
        $message .= "</td>";
        $message .= "<td style='padding-left:12px;'>";
        $message .= "$name";
        $message .= "</td>";
        $message .= "</tr>";
    }
    if (!empty($email)) {
        $message .= "<tr>";
        $message .= "<td>";
        $message .= "<strong> E-mail: </strong>";
        $message .= "</td>";
        $message .= "<td style='padding-left:12px;'>";
        $message .= "$email";
        $message .= "</td>";
        $message .= "</tr>";
    }
    if (!empty($vacancy)) {
        $message .= "<tr>";
        $message .= "<td>";
        $message .= "<strong> Vacancy: </strong>";
        $message .= "</td>";
        $message .= "<td style='padding-left:12px;'>";
        $message .= "$vacancy";
        $message .= "</td>";
        $message .= "</tr>";
    }
    
    
    if (!empty($comment)) {
        $message .= "<tr>";
        $message .= "<td>";
        $message .= "<strong> Message: </strong>";
        $message .= "</td>";
        $message .= "<td style='padding-left:12px;'>";
        $message .= "$comment";
        $message .= "</td>";
        $message .= "</tr>";
    }
    
   
    
    
    
    $message .= "</table><br><br>";
    $message .= '</body></html>';
    $headers = "MIME-Version: 1.0" . PHP_EOL .
        "Content-Type: text/html; charset=utf-8" . PHP_EOL .
        'From: '.adopt($name).' <'.$fromEmail.'>' . PHP_EOL .
        'Reply-To: '.adopt($name).' <'.$email.'> ' . PHP_EOL;

    if ( $recaptchaOn ) {
        if (!empty($recaptcha)) {
            $secret = '6LfMJSgTAAAAABw4lECZsLP5krXztMRZC0_Fgt3O';
            $url = "//www.google.com/recaptcha/api/siteverify?secret=".$secret ."&response=".$recaptcha."&remoteip=".$_SERVER['REMOTE_ADDR'];

            $response = file_get_contents("//www.google.com/recaptcha/api/siteverify?secret=".$secret ."&response=".$recaptcha."&remoteip=".$_SERVER['REMOTE_ADDR']);

            if ( $response.success === false ) {
                $answer = '2';
            } else {
                if (mail($to, adopt($subject), $message, $headers)) {
                    $answer = '1';
                } else {
                    $answer = '0';
                }
            }

        } else {
            $answer = '3';
        }
    } else {
        if (mail($to, adopt($subject), $message, $headers)) {
            $answer = '1';
        } else {
            $answer = '0';
        }
    }

    die($answer);

}
?>