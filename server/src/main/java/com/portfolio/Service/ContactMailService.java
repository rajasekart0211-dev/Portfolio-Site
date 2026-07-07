package com.portfolio.Service;

import com.portfolio.Model.Contact;
import com.portfolio.Repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactMailService {

    private final ContactRepository contactRepository;
    private final JavaMailSender mailSender;

    public Contact saveContact(Contact contact){

        Contact savedContact = contactRepository.save(contact);

        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setFrom(contact.getEmail());
        mailMessage.setSubject("New contact Message!");
        mailMessage.setTo("rajasekart0211@gmail.com");
        mailMessage.setText(
                        contact.getName() +"\n"+
                        contact.getEmail() + "\n\n" + contact.getMessage()
        );

        mailSender.send(mailMessage);

        return savedContact;
    }
}
