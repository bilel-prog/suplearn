package com.suplearn.service;

import com.suplearn.model.Quiz;
import com.suplearn.model.QuizAttempt;
import com.suplearn.repository.QuizAttemptRepository;
import com.suplearn.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class QuizService {
    
    @Autowired
    private QuizRepository quizRepository;
    
    @Autowired
    private QuizAttemptRepository quizAttemptRepository;
    
    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }
    
    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }
    
    public List<Quiz> getAllActiveQuizzes() {
        return quizRepository.findByIsActive(true);
    }
    
    public List<Quiz> getQuizzesBySubject(Long subjectId) {
        return quizRepository.findBySubjectIdAndIsActive(subjectId, true);
    }
    
    public List<Quiz> getQuizzesByProfessor(Long professorId) {
        return quizRepository.findByCreatedById(professorId);
    }
    
    public Quiz updateQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }
    
    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }
    
    public QuizAttempt recordQuizAttempt(QuizAttempt attempt) {
        return quizAttemptRepository.save(attempt);
    }
    
    public List<QuizAttempt> getUserQuizHistory(Long userId) {
        return quizAttemptRepository.findUserQuizHistory(userId);
    }
    
    public List<QuizAttempt> getQuizAttempts(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElse(null);
        if (quiz != null) {
            return quizAttemptRepository.findByQuiz(quiz);
        }
        return null;
    }
    
    public Map<String, Object> getUserQuizStatistics(Long userId) {
        Map<String, Object> stats = new HashMap<>();
        
        List<QuizAttempt> attempts = quizAttemptRepository.findUserQuizHistory(userId);
        Double averageScore = quizAttemptRepository.calculateAverageScore(userId);
        
        long passedQuizzes = attempts.stream().filter(QuizAttempt::getIsPassed).count();
        
        stats.put("totalAttempts", attempts.size());
        stats.put("passedQuizzes", passedQuizzes);
        stats.put("averageScore", averageScore != null ? averageScore : 0.0);
        
        return stats;
    }
}
