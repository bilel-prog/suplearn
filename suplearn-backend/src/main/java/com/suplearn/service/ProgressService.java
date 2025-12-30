package com.suplearn.service;

import com.suplearn.model.Progress;
import com.suplearn.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProgressService {
    
    @Autowired
    private ProgressRepository progressRepository;
    
    public Progress trackProgress(Progress progress) {
        return progressRepository.save(progress);
    }
    
    public List<Progress> getUserProgress(Long userId) {
        return progressRepository.findByUserId(userId);
    }
    
    public List<Progress> getUserProgressInDateRange(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        return progressRepository.findUserProgressInDateRange(userId, startDate, endDate);
    }
    
    public Map<String, Object> getUserStatistics(Long userId) {
        Map<String, Object> stats = new HashMap<>();
        
        Long totalStudyTime = progressRepository.calculateTotalStudyTime(userId);
        Long resourcesViewed = progressRepository.countResourcesViewed(userId);
        Long resourcesDownloaded = progressRepository.countResourcesDownloaded(userId);
        
        stats.put("totalStudyTimeMinutes", totalStudyTime != null ? totalStudyTime : 0);
        stats.put("resourcesViewed", resourcesViewed != null ? resourcesViewed : 0);
        stats.put("resourcesDownloaded", resourcesDownloaded != null ? resourcesDownloaded : 0);
        
        return stats;
    }
    
    public List<Progress> getUserProgressByActivityType(Long userId, Progress.ActivityType activityType) {
        return progressRepository.findByUserIdAndActivityType(userId, activityType);
    }
}
