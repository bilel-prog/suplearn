package com.suplearn.controller;

import com.suplearn.model.Resource;
import com.suplearn.model.Subject;
import com.suplearn.model.User;
import com.suplearn.service.ResourceService;
import com.suplearn.service.SubjectService;
import com.suplearn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "http://localhost:4200")
public class ResourceController {
    
    @Autowired
    private ResourceService resourceService;
    
    @Autowired
    private SubjectService subjectService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/public")
    public ResponseEntity<List<Resource>> getAllApprovedResources() {
        return ResponseEntity.ok(resourceService.getAllApprovedResources());
    }
    
    @GetMapping("/view/{id}")
    public ResponseEntity<?> getResourceById(@PathVariable Long id) {
        return resourceService.getResourceById(id)
            .map(resource -> {
                resourceService.incrementViewCount(id);
                return ResponseEntity.ok(resource);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<?> getResourcesBySubject(@PathVariable Long subjectId) {
        return subjectService.getSubjectById(subjectId)
            .map(subject -> ResponseEntity.ok(resourceService.getResourcesBySubject(subject)))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Resource>> getResourcesByType(@PathVariable Resource.ResourceType type) {
        return ResponseEntity.ok(resourceService.getResourcesByType(type));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Resource>> searchResources(@RequestParam String keyword) {
        return ResponseEntity.ok(resourceService.searchResources(keyword));
    }
    
    @PostMapping("/upload/anonymous")
    public ResponseEntity<?> uploadResourceAnonymously(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("type") Resource.ResourceType type,
            @RequestParam("subjectId") Long subjectId) {
        
        try {
            Subject subject = subjectService.getSubjectById(subjectId).orElse(null);
            if (subject == null) {
                return ResponseEntity.badRequest().body("Invalid subject");
            }
            
            Resource resource = new Resource();
            resource.setTitle(title);
            resource.setDescription(description);
            resource.setType(type);
            resource.setSubject(subject);
            resource.setStatus(Resource.ApprovalStatus.PENDING);
            
            Resource savedResource = resourceService.uploadResource(file, resource);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedResource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Upload failed: " + e.getMessage());
        }
    }
    
    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadResource(@PathVariable Long id) {
        return resourceService.getResourceById(id)
            .map(resource -> {
                try {
                    File file = new File(resource.getFilePath());
                    if (!file.exists()) {
                        return ResponseEntity.notFound().build();
                    }
                    
                    resourceService.incrementDownloadCount(id);
                    
                    FileSystemResource fileResource = new FileSystemResource(file);
                    HttpHeaders headers = new HttpHeaders();
                    headers.add(HttpHeaders.CONTENT_DISPOSITION, 
                        "attachment; filename=" + resource.getFileName());
                    
                    return ResponseEntity.ok()
                        .headers(headers)
                        .contentLength(file.length())
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(fileResource);
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                }
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/most-viewed")
    public ResponseEntity<List<Resource>> getMostViewedResources() {
        return ResponseEntity.ok(resourceService.getMostViewedResources());
    }
    
    @GetMapping("/most-downloaded")
    public ResponseEntity<List<Resource>> getMostDownloadedResources() {
        return ResponseEntity.ok(resourceService.getMostDownloadedResources());
    }
}
