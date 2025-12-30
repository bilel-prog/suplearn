package com.suplearn.repository;

import com.suplearn.model.Resource;
import com.suplearn.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByStatus(Resource.ApprovalStatus status);
    List<Resource> findByType(Resource.ResourceType type);
    List<Resource> findBySubject(Subject subject);
    List<Resource> findBySubjectAndType(Subject subject, Resource.ResourceType type);
    List<Resource> findByStatusAndSubject(Resource.ApprovalStatus status, Subject subject);
    
    @Query("SELECT r FROM Resource r WHERE r.status = 'APPROVED' ORDER BY r.uploadDate DESC")
    List<Resource> findAllApprovedResources();
    
    @Query("SELECT r FROM Resource r WHERE r.status = 'APPROVED' AND " +
           "(LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(r.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Resource> searchApprovedResources(@Param("keyword") String keyword);
    
    @Query("SELECT r FROM Resource r WHERE r.status = 'APPROVED' ORDER BY r.viewCount DESC")
    List<Resource> findMostViewedResources();
    
    @Query("SELECT r FROM Resource r WHERE r.status = 'APPROVED' ORDER BY r.downloadCount DESC")
    List<Resource> findMostDownloadedResources();
}
