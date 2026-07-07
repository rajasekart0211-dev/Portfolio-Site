package com.portfolio.Model;

import com.portfolio.Enum.ProjectType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "project")
public class Project {

    @Id
    private String id;

    private ProjectType type;

    @Builder.Default
    private LocalDate date = LocalDate.now();

    private String name;

    private String description;

    private List<String> techStack;

    private String liveLink;

    private String gitRepo;

    private String imageUrl;

    private boolean featured;
}