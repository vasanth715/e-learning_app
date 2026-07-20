package com.edusphere.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendEmail(String to, String subject, String body) {
        System.out.println("==================================================");
        System.out.println("DISPATCHING TRANSACTIONAL EMAIL NOTICE VIA SMTP...");
        System.out.println("TO: " + to);
        System.out.println("SUBJECT: " + subject);
        System.out.println("BODY:\n" + body);
        System.out.println("==================================================");
    }
}
