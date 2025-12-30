package com.suplearn.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "years")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Year {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String name; // e.g., "1st Year", "2nd Year", "3rd Year"
    
    @Column(name = "year_number", nullable = false)
    private Integer yearNumber; // 1, 2, 3
    
    private String description;
    
    @OneToMany(mappedBy = "year", cascade = CascadeType.ALL)
    private Set<Module> modules = new HashSet<>();
}
