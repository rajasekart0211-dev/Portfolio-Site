package com.portfolio.Service;

import com.portfolio.Repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.portfolio.Model.Feedback;

@Service
@RequiredArgsConstructor
public class FeedbackMailService {

    private final FeedbackRepository feedbackRepository;
    private final JavaMailSender mailSender;

    public Feedback sendMail(Feedback feedback) {

        // Save to MongoDB
        Feedback savedFeedback = feedbackRepository.save(feedback);

        // Send email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("rajasekart0211@gmail.com");
        message.setSubject("New Feedback message!");
        message.setText(
                savedFeedback.getMessage()
        );

        mailSender.send(message);

        return savedFeedback;
    }
}
