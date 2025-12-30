package com.suplearn.repository;

import com.suplearn.model.Module;
import com.suplearn.model.Year;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
    List<Module> findByYear(Year year);
    Optional<Module> findByCode(String code);
    List<Module> findByYearId(Long yearId);
}
