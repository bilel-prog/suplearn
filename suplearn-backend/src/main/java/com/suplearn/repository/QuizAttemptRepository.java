package com.suplearn.repository;

import com.suplearn.model.Quiz;
import com.suplearn.model.QuizAttempt;
import com.suplearn.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByUser(User user);
    List<QuizAttempt> findByQuiz(Quiz quiz);
    List<QuizAttempt> findByUserIdAndQuizId(Long userId, Long quizId);
    
    @Query("SELECT qa FROM QuizAttempt qa WHERE qa.user.id = :userId ORDER BY qa.attemptedAt DESC")
    List<QuizAttempt> findUserQuizHistory(@Param("userId") Long userId);
    
    @Query("SELECT AVG(qa.score) FROM QuizAttempt qa WHERE qa.user.id = :userId")
    Double calculateAverageScore(@Param("userId") Long userId);
}
