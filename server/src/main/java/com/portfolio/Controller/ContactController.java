package com.portfolio.Controller;

import com.portfolio.Model.Contact;
import com.portfolio.Model.Feedback;
import com.portfolio.Service.ContactMailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contact")
public class ContactController {

    private final ContactMailService contactMailService;

    @PostMapping
    public ResponseEntity<String> sendFeedback(@RequestBody Contact contact) {

        contactMailService.saveContact(contact);

        return ResponseEntity.ok("Contact sent successfully.");
    }
}
