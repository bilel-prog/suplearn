package com.suplearn.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "subjects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subject {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name; // e.g., "Algorithms", "Calculus"
    
    @Column(length = 1000)
    private String description;
    
    @Column(unique = true)
    private String code; // e.g., "ALG101", "CALC201"
    
    @ManyToOne
    @JoinColumn(name = "module_id", nullable = false)
    private Module module;
    
    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    private Set<Resource> resources = new HashSet<>();
    
    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    private Set<Quiz> quizzes = new HashSet<>();
}
