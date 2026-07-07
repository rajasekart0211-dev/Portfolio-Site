package com.portfolio.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "Contacts")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contact {

    @Id
    String id;

    String name;
    String email;
    String message;

    @Builder.Default
    LocalDateTime localDateTime = LocalDateTime.now();
}
