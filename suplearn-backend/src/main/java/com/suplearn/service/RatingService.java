package com.suplearn.service;

import com.suplearn.model.Rating;
import com.suplearn.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingService {
    
    @Autowired
    private RatingRepository ratingRepository;
    
    public Rating addOrUpdateRating(Rating rating) {
        Optional<Rating> existingRating = ratingRepository.findByResourceIdAndUserId(
            rating.getResource().getId(), 
            rating.getUser().getId()
        );
        
        if (existingRating.isPresent()) {
            Rating existing = existingRating.get();
            existing.setRating(rating.getRating());
            existing.setReview(rating.getReview());
            return ratingRepository.save(existing);
        } else {
            return ratingRepository.save(rating);
        }
    }
    
    public List<Rating> getResourceRatings(Long resourceId) {
        return ratingRepository.findByResourceId(resourceId);
    }
    
    public Double getAverageRating(Long resourceId) {
        Double avg = ratingRepository.calculateAverageRating(resourceId);
        return avg != null ? avg : 0.0;
    }
    
    public Long getRatingCount(Long resourceId) {
        return ratingRepository.countRatings(resourceId);
    }
    
    public void deleteRating(Long id) {
        ratingRepository.deleteById(id);
    }
}
