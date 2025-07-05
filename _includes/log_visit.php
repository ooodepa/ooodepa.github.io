<?php

try {
    $HOME = strlen($_SERVER['DOCUMENT_ROOT']) != 0 ? $_SERVER['DOCUMENT_ROOT'] : "";
    include "$HOME/php/LogVisit.php";
    LogVisit::logVisit();
}
catch(Throwable $exception) {}

?>
