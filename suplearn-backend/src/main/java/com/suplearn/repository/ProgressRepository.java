package com.suplearn.repository;

import com.suplearn.model.Progress;
import com.suplearn.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
    List<Progress> findByUser(User user);
    List<Progress> findByUserId(Long userId);
    List<Progress> findByUserIdAndActivityType(Long userId, Progress.ActivityType activityType);
    
    @Query("SELECT p FROM Progress p WHERE p.user.id = :userId AND p.activityDate BETWEEN :startDate AND :endDate")
    List<Progress> findUserProgressInDateRange(@Param("userId") Long userId, 
                                               @Param("startDate") LocalDateTime startDate, 
                                               @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT SUM(p.timeSpentMinutes) FROM Progress p WHERE p.user.id = :userId")
    Long calculateTotalStudyTime(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(p) FROM Progress p WHERE p.user.id = :userId AND p.activityType = 'VIEW'")
    Long countResourcesViewed(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(p) FROM Progress p WHERE p.user.id = :userId AND p.activityType = 'DOWNLOAD'")
    Long countResourcesDownloaded(@Param("userId") Long userId);
}
