<?php

class LogVisit {
    static function logVisit() {
        $HOME = strlen($_SERVER['DOCUMENT_ROOT']) != 0 ? $_SERVER['DOCUMENT_ROOT'] : "";

        $text = implode("\t", [
            LogVisit::getDatetime(),
            LogVisit::getIp(),
            LogVisit::getCurrentUrl(),
            LogVisit::getPlatform(),
            LogVisit::getClient(),
            "\n",
        ]);

        file_put_contents(
            "$HOME/../log_ip.csv",
            $text,
            FILE_APPEND,
        );
    }

    static function getDatetime() {
        return date('Y-m-d_H-i-s');
    }

    static function getIp() {
        $ip = "-";

        if (isset($_SERVER['REMOTE_ADDR'])) {
            $ip = $_SERVER['REMOTE_ADDR'];
        }

        return $ip;
    }

       static function getCurrentUrl() {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https://" : "http://";
        $host = $_SERVER['HTTP_HOST'] ?? '-';
        $uri = $_SERVER['REQUEST_URI'] ?? '-';
        return $protocol . $host . $uri;
    }

    static function getPlatform() {
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '-';
        
        // Определение платформы

        if (strpos($userAgent, 'Windows') !== false) {
            return 'Windows';
        }
        
        if (strpos($userAgent, 'Macintosh') !== false) {
            return 'Mac';
        }
        
        if (strpos($userAgent, 'Linux') !== false) {
            return 'Linux';
        }
        
        if (strpos($userAgent, 'Android') !== false) {
            return 'Android';
        }
        
        if (strpos($userAgent, 'iPhone') !== false || strpos($userAgent, 'iPad') !== false) {
            return 'iOS';
        }

        return 'Unknown Platform';
    }

    static function getClient() {
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '-';
        return $userAgent;
    }
}
