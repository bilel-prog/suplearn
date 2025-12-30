package com.suplearn.repository;

import com.suplearn.model.Rating;
import com.suplearn.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByResource(Resource resource);
    List<Rating> findByResourceId(Long resourceId);
    Optional<Rating> findByResourceIdAndUserId(Long resourceId, Long userId);
    
    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.resource.id = :resourceId")
    Double calculateAverageRating(@Param("resourceId") Long resourceId);
    
    @Query("SELECT COUNT(r) FROM Rating r WHERE r.resource.id = :resourceId")
    Long countRatings(@Param("resourceId") Long resourceId);
}
