package com.suplearn.repository;

import com.suplearn.model.Schedule;
import com.suplearn.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByUser(User user);
    List<Schedule> findByUserId(Long userId);
    List<Schedule> findByUserIdAndIsCompleted(Long userId, Boolean isCompleted);
    
    @Query("SELECT s FROM Schedule s WHERE s.user.id = :userId AND s.scheduledDate BETWEEN :startDate AND :endDate")
    List<Schedule> findUserScheduleInDateRange(@Param("userId") Long userId, 
                                               @Param("startDate") LocalDateTime startDate, 
                                               @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT s FROM Schedule s WHERE s.user.id = :userId AND s.scheduledDate >= :now AND s.isCompleted = false ORDER BY s.scheduledDate ASC")
    List<Schedule> findUpcomingSchedules(@Param("userId") Long userId, @Param("now") LocalDateTime now);
}
