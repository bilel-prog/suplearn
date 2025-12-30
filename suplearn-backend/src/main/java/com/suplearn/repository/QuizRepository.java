package com.suplearn.repository;

import com.suplearn.model.Quiz;
import com.suplearn.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findBySubject(Subject subject);
    List<Quiz> findBySubjectIdAndIsActive(Long subjectId, Boolean isActive);
    List<Quiz> findByIsActive(Boolean isActive);
    List<Quiz> findByCreatedById(Long userId);
}
