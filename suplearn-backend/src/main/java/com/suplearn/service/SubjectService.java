package com.suplearn.service;

import com.suplearn.model.Module;
import com.suplearn.model.Subject;
import com.suplearn.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {
    
    @Autowired
    private SubjectRepository subjectRepository;
    
    public Subject createSubject(Subject subject) {
        return subjectRepository.save(subject);
    }
    
    public Optional<Subject> getSubjectById(Long id) {
        return subjectRepository.findById(id);
    }
    
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }
    
    public List<Subject> getSubjectsByModule(Module module) {
        return subjectRepository.findByModule(module);
    }
    
    public List<Subject> getSubjectsByModuleId(Long moduleId) {
        return subjectRepository.findByModuleId(moduleId);
    }
    
    public Optional<Subject> getSubjectByCode(String code) {
        return subjectRepository.findByCode(code);
    }
    
    public Subject updateSubject(Subject subject) {
        return subjectRepository.save(subject);
    }
    
    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }
}
