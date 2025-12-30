package com.suplearn.service;

import com.suplearn.model.Schedule;
import com.suplearn.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {
    
    @Autowired
    private ScheduleRepository scheduleRepository;
    
    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }
    
    public Optional<Schedule> getScheduleById(Long id) {
        return scheduleRepository.findById(id);
    }
    
    public List<Schedule> getUserSchedules(Long userId) {
        return scheduleRepository.findByUserId(userId);
    }
    
    public List<Schedule> getUpcomingSchedules(Long userId) {
        return scheduleRepository.findUpcomingSchedules(userId, LocalDateTime.now());
    }
    
    public List<Schedule> getUserScheduleInDateRange(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        return scheduleRepository.findUserScheduleInDateRange(userId, startDate, endDate);
    }
    
    public Schedule updateSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }
    
    public Schedule markScheduleAsCompleted(Long scheduleId) {
        Optional<Schedule> scheduleOpt = scheduleRepository.findById(scheduleId);
        if (scheduleOpt.isPresent()) {
            Schedule schedule = scheduleOpt.get();
            schedule.setIsCompleted(true);
            return scheduleRepository.save(schedule);
        }
        return null;
    }
    
    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }
}
