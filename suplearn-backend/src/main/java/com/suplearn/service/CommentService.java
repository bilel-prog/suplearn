package com.suplearn.service;

import com.suplearn.model.Comment;
import com.suplearn.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    
    @Autowired
    private CommentRepository commentRepository;
    
    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }
    
    public List<Comment> getResourceComments(Long resourceId) {
        return commentRepository.findTopLevelComments(resourceId);
    }
    
    public List<Comment> getReplies(Long parentCommentId) {
        return commentRepository.findByParentCommentId(parentCommentId);
    }
    
    public Comment updateComment(Comment comment) {
        return commentRepository.save(comment);
    }
    
    public Comment approveComment(Long commentId) {
        Optional<Comment> commentOpt = commentRepository.findById(commentId);
        if (commentOpt.isPresent()) {
            Comment comment = commentOpt.get();
            comment.setIsApproved(true);
            return commentRepository.save(comment);
        }
        return null;
    }
    
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
