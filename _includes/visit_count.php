<?php

try {
    $HOME = strlen($_SERVER['DOCUMENT_ROOT']) != 0 ? $_SERVER['DOCUMENT_ROOT'] : "";
    include "$HOME/php/VisitCount.php";
    VisitCount::updateCount();
}
catch(Throwable $exception) {}

?>
