package com.suplearn.service;

import com.suplearn.model.Resource;
import com.suplearn.model.Subject;
import com.suplearn.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ResourceService {
    
    @Autowired
    private ResourceRepository resourceRepository;
    
    @Value("${file.upload-dir}")
    private String uploadDir;
    
    public List<Resource> getAllApprovedResources() {
        return resourceRepository.findAllApprovedResources();
    }
    
    public List<Resource> getPendingResources() {
        return resourceRepository.findByStatus(Resource.ApprovalStatus.PENDING);
    }
    
    public List<Resource> getResourcesBySubject(Subject subject) {
        return resourceRepository.findByStatusAndSubject(Resource.ApprovalStatus.APPROVED, subject);
    }
    
    public List<Resource> getResourcesByType(Resource.ResourceType type) {
        return resourceRepository.findByType(type);
    }
    
    public List<Resource> searchResources(String keyword) {
        return resourceRepository.searchApprovedResources(keyword);
    }
    
    public Optional<Resource> getResourceById(Long id) {
        return resourceRepository.findById(id);
    }
    
    public Resource uploadResource(MultipartFile file, Resource resource) throws IOException {
        // Create upload directory if it doesn't exist
        File uploadDirectory = new File(uploadDir);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }
        
        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
        
        // Save file
        Path filePath = Paths.get(uploadDir, uniqueFilename);
        Files.write(filePath, file.getBytes());
        
        // Set resource properties
        resource.setFileName(originalFilename);
        resource.setFilePath(filePath.toString());
        resource.setFileType(file.getContentType());
        resource.setFileSize(file.getSize());
        resource.setUploadDate(LocalDateTime.now());
        
        return resourceRepository.save(resource);
    }
    
    public Resource approveResource(Long resourceId, Long adminId) {
        Optional<Resource> resourceOpt = resourceRepository.findById(resourceId);
        if (resourceOpt.isPresent()) {
            Resource resource = resourceOpt.get();
            resource.setStatus(Resource.ApprovalStatus.APPROVED);
            resource.setApprovalDate(LocalDateTime.now());
            return resourceRepository.save(resource);
        }
        return null;
    }
    
    public Resource rejectResource(Long resourceId) {
        Optional<Resource> resourceOpt = resourceRepository.findById(resourceId);
        if (resourceOpt.isPresent()) {
            Resource resource = resourceOpt.get();
            resource.setStatus(Resource.ApprovalStatus.REJECTED);
            return resourceRepository.save(resource);
        }
        return null;
    }
    
    public void incrementViewCount(Long resourceId) {
        Optional<Resource> resourceOpt = resourceRepository.findById(resourceId);
        if (resourceOpt.isPresent()) {
            Resource resource = resourceOpt.get();
            resource.setViewCount(resource.getViewCount() + 1);
            resourceRepository.save(resource);
        }
    }
    
    public void incrementDownloadCount(Long resourceId) {
        Optional<Resource> resourceOpt = resourceRepository.findById(resourceId);
        if (resourceOpt.isPresent()) {
            Resource resource = resourceOpt.get();
            resource.setDownloadCount(resource.getDownloadCount() + 1);
            resourceRepository.save(resource);
        }
    }
    
    public void deleteResource(Long id) {
        Optional<Resource> resourceOpt = resourceRepository.findById(id);
        if (resourceOpt.isPresent()) {
            Resource resource = resourceOpt.get();
            // Delete file from filesystem
            try {
                Files.deleteIfExists(Paths.get(resource.getFilePath()));
            } catch (IOException e) {
                e.printStackTrace();
            }
            resourceRepository.deleteById(id);
        }
    }
    
    public List<Resource> getMostViewedResources() {
        return resourceRepository.findMostViewedResources();
    }
    
    public List<Resource> getMostDownloadedResources() {
        return resourceRepository.findMostDownloadedResources();
    }
}
