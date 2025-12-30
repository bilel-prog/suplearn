package com.suplearn.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "modules")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Module {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name; // e.g., "Computer Science", "Mathematics"
    
    @Column(length = 1000)
    private String description;
    
    @Column(unique = true)
    private String code; // e.g., "CS", "MATH"
    
    @ManyToOne
    @JoinColumn(name = "year_id", nullable = false)
    private Year year;
    
    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    private Set<Subject> subjects = new HashSet<>();
}
