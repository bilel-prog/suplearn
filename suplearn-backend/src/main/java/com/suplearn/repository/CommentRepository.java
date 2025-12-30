package com.suplearn.repository;

import com.suplearn.model.Comment;
import com.suplearn.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByResource(Resource resource);
    List<Comment> findByResourceIdAndIsApproved(Long resourceId, Boolean isApproved);
    List<Comment> findByParentCommentId(Long parentCommentId);
    List<Comment> findByUserId(Long userId);
    
    @Query("SELECT c FROM Comment c WHERE c.resource.id = :resourceId AND c.parentComment IS NULL AND c.isApproved = true ORDER BY c.createdAt DESC")
    List<Comment> findTopLevelComments(@Param("resourceId") Long resourceId);
}
