import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcademicService } from '../../services/academic.service';
import { QuizService } from '../../services/quiz.service';
import { MockDataService } from '../../services/mock-data.service';
import { Year, Module, Subject } from '../../models/academic.model';
import { Quiz } from '../../models/quiz.model';
import { STATIC_ACADEMIC_DATA, StaticYear, StaticModule } from '../../models/academic-static-data';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  quizForm: FormGroup;
  years: Year[] = [];
  modules: Module[] = [];
  subjects: Subject[] = [];
  
  loading = false;
  success = false;
  error: string | null = null;
  createdQuizId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private academicService: AcademicService,
    private quizService: QuizService,
    private mockDataService: MockDataService
  ) {
    this.quizForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      year: ['', Validators.required],
      module: ['', Validators.required],
      subject: ['', Validators.required],
      durationMinutes: [30, [Validators.required, Validators.min(5), Validators.max(180)]],
      passingScore: [60, [Validators.required, Validators.min(0), Validators.max(100)]],
      googleFormUrl: ['https://forms.google.com/create', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadYears();
  }

  loadYears(): void {
    this.academicService.getAllYears().subscribe(
      years => {
        this.years = years;
      },
      error => {
        console.error('Error loading years', error);
        this.years = STATIC_ACADEMIC_DATA.map(({ id, name }) => ({ id, name } as Year));
      }
    );
  }

  onYearChange(): void {
    const yearId = +this.quizForm.get('year')!.value;
    if (yearId) {
      const selectedYear: StaticYear | undefined = STATIC_ACADEMIC_DATA.find(y => y.id === yearId);
      
      this.academicService.getModulesByYear(yearId).subscribe(
        modules => {
          this.modules = modules && modules.length ? modules : selectedYear?.modules || [];
        },
        error => {
          console.error('Error loading modules', error);
          this.modules = selectedYear?.modules || [];
        }
      );
    }
    this.quizForm.patchValue({ module: '', subject: '' });
    this.modules = [];
    this.subjects = [];
  }

  onModuleChange(): void {
    const moduleId = +this.quizForm.get('module')!.value;
    const yearId = +this.quizForm.get('year')!.value;
    
    if (moduleId && yearId) {
      const selectedYear: StaticYear | undefined = STATIC_ACADEMIC_DATA.find(y => y.id === yearId);
      const staticModule: StaticModule | undefined = selectedYear?.modules?.find(m => m.id === moduleId);
      
      this.academicService.getSubjectsByModule(moduleId).subscribe(
        subjects => {
          this.subjects = subjects && subjects.length ? subjects : staticModule?.subjects || [];
        },
        error => {
          console.error('Error loading subjects', error);
          this.subjects = staticModule?.subjects || [];
        }
      );
    }
    this.quizForm.patchValue({ subject: '' });
  }

  /**
   * Open Google Forms in new window to create the form
   * The URL should be pasted back after creating the form
   */
  openGoogleForms(): void {
    window.open('https://forms.google.com/create', '_blank');
  }

  createQuiz(): void {
    if (this.quizForm.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = false;

    const formValue = this.quizForm.value;
    const newQuiz: Quiz = {
      title: formValue.title,
      description: formValue.description,
      googleFormUrl: formValue.googleFormUrl,
      subjectId: +formValue.subject,
      createdById: 1, // Current user (mock)
      isActive: true,
      durationMinutes: formValue.durationMinutes,
      passingScore: formValue.passingScore
    };

    this.quizService.createQuiz(newQuiz).subscribe(
      quiz => {
        this.loading = false;
        this.success = true;
        this.createdQuizId = quiz.id || 1;
        
        // Reset form
        this.quizForm.reset({
          durationMinutes: 30,
          passingScore: 60,
          googleFormUrl: 'https://forms.google.com/create'
        });

        // Show success message for 5 seconds
        setTimeout(() => {
          this.success = false;
        }, 5000);
      },
      error => {
        this.loading = false;
        console.error('Error creating quiz', error);
        this.error = 'Failed to create quiz. Please try again.';
      }
    );
  }

  openTakeQuiz(): void {
    if (this.createdQuizId) {
      window.open(`/take-quiz/${this.createdQuizId}`, '_blank');
    }
  }
}
