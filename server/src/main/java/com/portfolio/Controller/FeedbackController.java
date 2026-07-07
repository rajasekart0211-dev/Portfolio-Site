package com.portfolio.Controller;

import com.portfolio.Model.Feedback;
import com.portfolio.Service.FeedbackMailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackMailService feedbackMailService;

    @PostMapping
    public ResponseEntity<String> sendFeedback(@RequestBody Feedback feedback) {

        feedbackMailService.sendMail(feedback);

        return ResponseEntity.ok("Feedback sent successfully.");
    }
}
