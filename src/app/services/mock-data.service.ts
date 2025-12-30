import { Injectable } from '@angular/core';
import { Resource, ResourceType, ApprovalStatus } from '../models/resource.model';
import { Quiz } from '../models/quiz.model';
import { Schedule } from '../models/schedule.model';
import { Progress, ActivityType } from '../models/progress.model';
import { STATIC_ACADEMIC_DATA } from '../models/academic-static-data';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private resourceTitles = [
    'Introduction to Digital Circuits',
    'Advanced C Programming Guide',
    'Network Fundamentals Course',
    'Database Design Best Practices',
    'Web Development Tutorial',
    'Mobile App Development Guide',
    'Data Structures Algorithms',
    'Operating Systems Concepts',
    'Signal Processing Basics',
    'Embedded Systems Design',
    'Machine Learning Fundamentals',
    'Microservices Architecture',
    'Cloud Computing Essentials',
    'DevOps Practices Guide',
    'Software Testing Handbook'
  ];

  private resourceDescriptions = [
    'Comprehensive guide covering core concepts and practical applications',
    'In-depth tutorial with step-by-step examples and best practices',
    'Complete reference manual with code samples and use cases',
    'Advanced techniques for professional-level implementation',
    'Beginner-friendly introduction to the subject matter',
    'Real-world case studies and industry standards',
    'Quick reference guide for common scenarios',
    'Hands-on lab exercises and projects'
  ];

  constructor() {}

  /**
   * Generate mock resources across all subjects
   */
  getMockResources(): Resource[] {
    const mockResources: Resource[] = [];
    let resourceId = 1;

    // First, generate 3 PENDING resources for admin approval
    const pendingResources = [
      {
        id: resourceId++,
        title: 'Advanced Digital Circuit Design - Complete Course Material',
        description: 'Comprehensive guide covering advanced topics in digital circuit design including FPGA programming, VHDL, and practical implementations.',
        fileName: 'digital_circuits_advanced.pdf',
        filePath: '/uploads/resources/resource_pending_1',
        fileType: 'application/pdf',
        fileSize: 15728640, // 15 MB
        type: ResourceType.COURSE,
        status: ApprovalStatus.PENDING,
        subjectId: 10101,
        uploadedBy: {
          id: 42,
          username: 'prof.khalil',
          email: 'khalil.mahmoud@supcom.tn',
          firstName: 'Khalil',
          lastName: 'Mahmoud',
          role: 'PROFESSOR' as any
        },
        uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        viewCount: 0,
        downloadCount: 0,
        averageRating: 0,
        ratingCount: 0
      },
      {
        id: resourceId++,
        title: 'Data Structures Final Exam 2024 - Solutions Included',
        description: 'Previous year final exam with detailed solutions and explanations. Covers trees, graphs, sorting algorithms, and complexity analysis.',
        fileName: 'data_structures_exam_2024.pdf',
        filePath: '/uploads/resources/resource_pending_2',
        fileType: 'application/pdf',
        fileSize: 3145728, // 3 MB
        type: ResourceType.EXAM,
        status: ApprovalStatus.PENDING,
        subjectId: 10201,
        uploadedBy: {
          id: 156,
          username: 'student.med',
          email: 'mohamed.ben@supcom.tn',
          firstName: 'Mohamed',
          lastName: 'Ben Ali',
          role: 'STUDENT' as any
        },
        uploadDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        viewCount: 0,
        downloadCount: 0,
        averageRating: 0,
        ratingCount: 0
      },
      {
        id: resourceId++,
        title: 'Network Security Project - Implementation Guide',
        description: 'Step-by-step project guide for implementing a secure network infrastructure. Includes firewall configuration, VPN setup, and intrusion detection systems.',
        fileName: 'network_security_project.zip',
        filePath: '/uploads/resources/resource_pending_3',
        fileType: 'application/zip',
        fileSize: 52428800, // 50 MB
        type: ResourceType.PROJECT,
        status: ApprovalStatus.PENDING,
        subjectId: 10303,
        uploadedBy: {
          id: 89,
          username: 'prof.amira',
          email: 'amira.gharbi@supcom.tn',
          firstName: 'Amira',
          lastName: 'Gharbi',
          role: 'PROFESSOR' as any
        },
        uploadDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        viewCount: 0,
        downloadCount: 0,
        averageRating: 0,
        ratingCount: 0
      }
    ];

    mockResources.push(...pendingResources);

    // Generate 3-5 resources per subject (all APPROVED)
    STATIC_ACADEMIC_DATA.forEach(year => {
      if (year.modules) {
        year.modules.forEach(module => {
          if (module.subjects) {
            module.subjects.forEach(subject => {
              const resourceCount = Math.floor(Math.random() * 3) + 3; // 3-5 resources per subject
              
              for (let i = 0; i < resourceCount; i++) {
                const resourceType = this.getRandomResourceType();
                mockResources.push({
                  id: resourceId++,
                  title: `${this.getRandomTitle()} - ${subject.name}`,
                  description: this.getRandomDescription(),
                  fileName: `resource_${resourceId}.${this.getFileExtension(resourceType)}`,
                  filePath: `/uploads/resources/resource_${resourceId}`,
                  fileType: this.getFileType(resourceType),
                  fileSize: Math.floor(Math.random() * 50) + 1 * 1024 * 1024, // 1-50 MB
                  type: resourceType,
                  status: ApprovalStatus.APPROVED,
                  subjectId: subject.id!,
                  uploadedBy: {
                    id: Math.floor(Math.random() * 10) + 1,
                    username: this.getRandomProfessor(),
                    email: `professor${Math.floor(Math.random() * 20) + 1}@supcom.tn`,
                    firstName: 'Prof',
                    lastName: 'Name',
                    role: 'PROFESSOR'
                  },
                  approvedBy: {
                    id: 0,
                    username: 'admin',
                    email: 'admin@supcom.tn',
                    firstName: 'Admin',
                    lastName: 'User',
                    role: 'ADMIN'
                  },
                  uploadDate: this.getRandomDate(365),
                  approvalDate: this.getRandomDate(365),
                  viewCount: Math.floor(Math.random() * 500) + 50,
                  downloadCount: Math.floor(Math.random() * 300) + 10,
                  averageRating: Math.floor(Math.random() * 50) / 10,
                  ratingCount: Math.floor(Math.random() * 100) + 5
                });
              }
            });
          }
        });
      }
    });

    return mockResources;
  }

  /**
   * Generate mock quizzes with Google Forms links
   */
  getMockQuizzes(): Quiz[] {
    const mockQuizzes: Quiz[] = [];
    let quizId = 1;

    // All quizzes route to this single Google Forms template URL
    // In production, each quiz would have its own unique form
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSce-bcRh4ph7ytzo_YJ36_br458Y_bgMddUoJYhAnP-OkfpFA/viewform?usp=header';

    // Generate 1-2 quizzes per subject
    STATIC_ACADEMIC_DATA.forEach(year => {
      if (year.modules) {
        year.modules.forEach(module => {
          if (module.subjects) {
            module.subjects.forEach(subject => {
              const quizCount = Math.random() > 0.5 ? 2 : 1;
              
              for (let i = 0; i < quizCount; i++) {
                mockQuizzes.push({
                  id: quizId++,
                  title: `${subject.name} - Quiz ${i + 1}`,
                  description: `Assessment for ${subject.name}. This quiz covers key concepts and applications.`,
                  googleFormUrl: googleFormUrl,
                  subjectId: subject.id!,
                  createdById: Math.floor(Math.random() * 10) + 1,
                  createdAt: this.getRandomDate(365),
                  isActive: true,
                  durationMinutes: Math.floor(Math.random() * 30) + 15, // 15-45 minutes
                  passingScore: Math.floor(Math.random() * 20) + 60 // 60-80%
                });
              }
            });
          }
        });
      }
    });

    return mockQuizzes;
  }

  /**
   * Generate mock schedules for study sessions
   */
  getMockSchedules(userId: number = 1): Schedule[] {
    const mockSchedules: Schedule[] = [];
    let scheduleId = 1;

    const titles = [
      'Study Session',
      'Lab Work',
      'Project Development',
      'Group Assignment',
      'Exam Preparation',
      'Tutorial Review',
      'Practice Exercises',
      'Concept Deep Dive'
    ];

    // Generate 2-3 schedules per subject
    STATIC_ACADEMIC_DATA.forEach(year => {
      if (year.modules) {
        year.modules.forEach(module => {
          if (module.subjects) {
            module.subjects.forEach(subject => {
              const scheduleCount = Math.floor(Math.random() * 2) + 2; // 2-3 schedules
              
              for (let i = 0; i < scheduleCount; i++) {
                mockSchedules.push({
                  id: scheduleId++,
                  userId: userId,
                  subjectId: subject.id!,
                  title: `${titles[Math.floor(Math.random() * titles.length)]} - ${subject.name}`,
                  description: `Scheduled study session for ${subject.name}. Review lecture notes and complete exercises.`,
                  scheduledDate: this.getRandomFutureDate(),
                  durationMinutes: Math.floor(Math.random() * 90) + 30, // 30-120 minutes
                  isCompleted: Math.random() > 0.7, // 30% chance of being completed
                  googleCalendarEventId: `event_${Math.random().toString(36).substring(7)}`,
                  reminderType: 'ONE_HOUR' as any
                });
              }
            });
          }
        });
      }
    });

    return mockSchedules;
  }

  /**
   * Generate mock progress/activity data
   */
  getMockProgress(userId: number = 1): Progress[] {
    const mockProgress: Progress[] = [];
    let progressId = 1;
    const resources = this.getMockResources();

    // Generate activities for random resources
    for (let i = 0; i < 50; i++) {
      const randomResource = resources[Math.floor(Math.random() * resources.length)];
      const activityTypes = Object.values(ActivityType);
      const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];

      mockProgress.push({
        id: progressId++,
        userId: userId,
        resourceId: randomResource.id,
        subjectId: randomResource.subjectId,
        activityType: activityType,
        timeSpentMinutes: Math.floor(Math.random() * 120) + 10,
        activityDate: this.getRandomDate(30), // Last 30 days
        notes: `Completed ${activityType.toLowerCase()} activity`
      });
    }

    return mockProgress;
  }

  /**
   * Generate dashboard statistics
   */
  getDashboardStats() {
    const resources = this.getMockResources();
    const quizzes = this.getMockQuizzes();
    const progress = this.getMockProgress();

    return {
      totalResourcesViewed: progress.filter(p => p.activityType === ActivityType.VIEW).length,
      totalResourcesDownloaded: progress.filter(p => p.activityType === ActivityType.DOWNLOAD).length,
      totalStudyTimeHours: Math.floor(progress.reduce((sum, p) => sum + (p.timeSpentMinutes || 0), 0) / 60),
      totalQuizzesAttempted: Math.floor(Math.random() * 20) + 5,
      averageQuizScore: Math.floor(Math.random() * 30) + 65,
      bookmarkedResourcesCount: Math.floor(Math.random() * 15) + 3,
      totalResourcesInSystem: resources.length,
      totalQuizzesInSystem: quizzes.length,
      mostViewedSubjects: this.getMostViewedSubjects(progress),
      recentActivities: progress.slice(0, 10)
    };
  }

  /**
   * Get resources filtered by subject
   */
  getResourcesBySubject(subjectId: number): Resource[] {
    return this.getMockResources().filter(r => r.subjectId === subjectId);
  }

  /**
   * Get quizzes filtered by subject
   */
  getQuizzesBySubject(subjectId: number): Quiz[] {
    return this.getMockQuizzes().filter(q => q.subjectId === subjectId);
  }

  /**
   * Get most viewed subjects
   */
  private getMostViewedSubjects(progress: Progress[]): any[] {
    const subjectMap = new Map<number, number>();
    
    progress.forEach(p => {
      if (p.subjectId) {
        subjectMap.set(p.subjectId, (subjectMap.get(p.subjectId) || 0) + 1);
      }
    });

    // Convert to array and sort
    const sorted = Array.from(subjectMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return sorted.map(([subjectId, count]) => ({
      subjectId,
      viewCount: count,
      subjectName: this.getSubjectNameById(subjectId)
    }));
  }

  /**
   * Get subject name by ID
   */
  private getSubjectNameById(subjectId: number): string {
    for (const year of STATIC_ACADEMIC_DATA) {
      if (year.modules) {
        for (const module of year.modules) {
          if (module.subjects) {
            const subject = module.subjects.find(s => s.id === subjectId);
            if (subject) return subject.name!;
          }
        }
      }
    }
    return 'Unknown Subject';
  }

  // ==================== Helper Methods ====================

  private getRandomTitle(): string {
    return this.resourceTitles[Math.floor(Math.random() * this.resourceTitles.length)];
  }

  private getRandomDescription(): string {
    return this.resourceDescriptions[Math.floor(Math.random() * this.resourceDescriptions.length)];
  }

  private getRandomResourceType(): ResourceType {
    const types = [ResourceType.COURSE, ResourceType.EXAM, ResourceType.PROJECT, ResourceType.COURSEWORK];
    return types[Math.floor(Math.random() * types.length)];
  }

  private getFileExtension(type: ResourceType): string {
    const extensions: { [key in ResourceType]: string } = {
      [ResourceType.COURSE]: 'pdf',
      [ResourceType.EXAM]: 'pdf',
      [ResourceType.PROJECT]: 'zip',
      [ResourceType.COURSEWORK]: 'docx'
    };
    return extensions[type];
  }

  private getFileType(type: ResourceType): string {
    const types: { [key in ResourceType]: string } = {
      [ResourceType.COURSE]: 'application/pdf',
      [ResourceType.EXAM]: 'application/pdf',
      [ResourceType.PROJECT]: 'application/zip',
      [ResourceType.COURSEWORK]: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    return types[type];
  }

  private getRandomProfessor(): string {
    const professors = [
      'Dr. Habib',
      'Prof. Salim',
      'Dr. Fatima',
      'Prof. Mohammed',
      'Dr. Amina',
      'Prof. Karim',
      'Dr. Zainab',
      'Prof. Ahmed',
      'Dr. Sophia',
      'Prof. Hassan'
    ];
    return professors[Math.floor(Math.random() * professors.length)];
  }

  private getRandomDate(daysBack: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
    return date;
  }

  private getRandomFutureDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 90) + 1); // 1-90 days in future
    return date;
  }
}

// Import User type for professor and admin
interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
