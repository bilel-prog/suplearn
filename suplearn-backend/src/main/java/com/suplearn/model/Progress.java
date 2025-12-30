package com.suplearn.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Progress {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "resource_id")
    private Resource resource;
    
    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityType activityType;
    
    @Column(name = "time_spent_minutes")
    private Integer timeSpentMinutes;
    
    @Column(name = "activity_date")
    private LocalDateTime activityDate;
    
    @Column(length = 1000)
    private String notes;
    
    @PrePersist
    protected void onCreate() {
        activityDate = LocalDateTime.now();
    }
    
    public enum ActivityType {
        VIEW, DOWNLOAD, QUIZ_ATTEMPT, STUDY_SESSION
    }
}
