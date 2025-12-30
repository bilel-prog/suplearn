package com.suplearn.repository;

import com.suplearn.model.Module;
import com.suplearn.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findByModule(Module module);
    Optional<Subject> findByCode(String code);
    List<Subject> findByModuleId(Long moduleId);
}
