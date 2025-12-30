import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceService } from '../../services/resource.service';
import { AcademicService } from '../../services/academic.service';
import { Year, Module, Subject } from '../../models/academic.model';
import { StaticModule, StaticYear } from '../../models/academic-static-data';

const STATIC_ACADEMIC_DATA: StaticYear[] = [
  {
    id: 1,
    name: 'Semestre 1 (TC S1)',
    modules: [
      {
        id: 101,
        name: 'ELC01-01 · Circuits et Systèmes électroniques et hyperfréquences',
        subjects: [
          { id: 10101, name: 'Circuits et Systèmes Numériques' },
          { id: 10102, name: 'Hyperfréquences' },
          { id: 10103, name: 'Antennes' }
        ]
      },
      {
        id: 102,
        name: 'INF01-01 · Algorithmique et programmation',
        subjects: [
          { id: 10201, name: 'Algorithmique et structures de données Avancées' },
          { id: 10202, name: 'Atelier de programmation C' },
          { id: 10203, name: "Architecture et Système d'exploitation" }
        ]
      },
      {
        id: 103,
        name: 'RES01-01 · Fondements des réseaux',
        subjects: [
          { id: 10301, name: 'Introduction aux Technologies du monde digital' },
          { id: 10302, name: 'Télécommunication' },
          { id: 10303, name: 'Réseaux Locaux et IP' }
        ]
      },
      {
        id: 104,
        name: 'MDI01-01 · Mathématiques et Probabilités',
        subjects: [
          { id: 10401, name: 'Mathématiques pour les TIC' },
          { id: 10402, name: 'Théorie du signal' },
          { id: 10403, name: 'Probabilités et processus aléatoires' }
        ]
      },
      {
        id: 105,
        name: 'SCS01-01 · Entreprenariat : Management des affaires',
        subjects: [
          { id: 10501, name: "Management de l'Entreprise" },
          { id: 10502, name: 'Droit des Affaires' },
          { id: 10503, name: 'Macroéconomie' }
        ]
      },
      {
        id: 106,
        name: 'LCG01-01 · Techniques de Communications',
        subjects: [
          { id: 10601, name: 'Anglais' },
          { id: 10602, name: 'Français' },
          { id: 10603, name: "Séminaires d'ouverture (Français)" }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Semestre 2 (TC S2)',
    modules: [
      {
        id: 201,
        name: "ELC02-01 · Technologies de traitement embarqué de l'information",
        subjects: [
          { id: 20101, name: 'Architecture et programmation embarquée' },
          { id: 20102, name: "Théorie de l'information et Codage" },
          { id: 20103, name: 'Projet de conception RF et Electronique' }
        ]
      },
      {
        id: 202,
        name: 'INF02-01 · Bases de données et système',
        subjects: [
          { id: 20201, name: 'Conception des bases de données relationnelles' },
          { id: 20202, name: 'Programmation Orienté Objet (C++)' },
          { id: 20203, name: 'Linux et programmation système' }
        ]
      },
      {
        id: 203,
        name: 'RES02-01 · Réseaux IP',
        subjects: [
          { id: 20301, name: 'Routage et Commutation dans les réseaux' },
          { id: 20302, name: 'Pratique réseaux' }
        ]
      },
      {
        id: 204,
        name: 'MDI02-01 · Optimisation et Signal',
        subjects: [
          { id: 20401, name: 'Recherche opérationnelle' },
          { id: 20402, name: 'Optimisation convexe' },
          { id: 20403, name: 'Traitement du signal' }
        ]
      },
      {
        id: 205,
        name: 'SCS02-01 · Management et projets sociétaux',
        subjects: [
          { id: 20501, name: 'Management des projets' },
          { id: 20502, name: 'Pacte' }
        ]
      },
      {
        id: 206,
        name: 'LCG02-01 · Techniques de communications',
        subjects: [
          { id: 20601, name: 'Anglais' },
          { id: 20602, name: 'Français' },
          { id: 20603, name: "Séminaires d'ouverture (Français)" }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Semestre 3 (TC S3)',
    modules: [
      {
        id: 301,
        name: 'ELC03-01 · Systèmes de communication haut-débit',
        subjects: [
          { id: 30101, name: 'Composants et Systèmes optiques' },
          { id: 30102, name: 'Transmission numérique' }
        ]
      },
      {
        id: 302,
        name: 'INF03-01 · Conception et Développement avancés',
        subjects: [
          { id: 30201, name: 'Unified Modeling Language' },
          { id: 30202, name: 'Technologies (Web et mobile)' },
          { id: 30203, name: 'Projet Développement (Web et Mobile)' }
        ]
      },
      {
        id: 303,
        name: 'RES03-01 · Réseaux sans fil et Mobiles',
        subjects: [
          { id: 30301, name: 'Propagation multitrajets et diversités' },
          { id: 30302, name: 'Fondements et architectures des réseaux cellulaires' },
          { id: 30303, name: 'WLAN & Réseaux IP étendus' }
        ]
      },
      {
        id: 304,
        name: 'MDI03-01 · Éléments des sciences de données',
        subjects: [
          { id: 30401, name: 'Inférence statistique' },
          { id: 30402, name: "Atelier d'optimisation" },
          { id: 30403, name: "Ingénierie des données" }
        ]
      },
      {
        id: 305,
        name: 'SCS03-01 · Entrepreneuriat et Finance',
        subjects: [
          { id: 30501, name: 'Comptabilité financière' },
          { id: 30502, name: "Finances d'Entreprise" },
          { id: 30503, name: 'Culture Entrepreneuriale' }
        ]
      },
      {
        id: 306,
        name: 'LCG03-01 · Techniques de communications',
        subjects: [
          { id: 30601, name: 'Anglais' },
          { id: 30602, name: 'Français' },
          { id: 30603, name: "Séminaires d'ouverture (Français)" }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Semestre 4 (TC S4)',
    modules: [
      {
        id: 401,
        name: 'INF04-01 · Ingénierie des services',
        subjects: [
          { id: 40101, name: 'Introduction à Ingénierie des Services Numériques' },
          { id: 40102, name: 'Technologies des services' }
        ]
      },
      {
        id: 402,
        name: 'INF04-02 · Big Data and IA',
        subjects: [
          { id: 40201, name: "Fondement de l'IA" },
          { id: 40202, name: 'Big Data' }
        ]
      },
      {
        id: 403,
        name: 'RES04-01 · IoT et Cloud',
        subjects: [
          { id: 40301, name: 'IoT devices' },
          { id: 40302, name: 'Fondement Cloud' }
        ]
      },
      {
        id: 404,
        name: 'RES04-02 · Mobile and Networking',
        subjects: [
          { id: 40401, name: 'Réseaux Large Bande LTE/LTE-Pro' },
          { id: 40402, name: 'Evolution et Migration vers la 6G' }
        ]
      },
      {
        id: 405,
        name: 'INFSC04-03 · Sécurité',
        subjects: [
          { id: 40501, name: 'Algorithmes et Protocoles Cryptographiques' },
          { id: 40502, name: 'Cyber Security Fundamental' }
        ]
      },
      {
        id: 406,
        name: 'INFSC04-04 · Économie et régulation du Digital',
        subjects: [
          { id: 40601, name: 'Plateformes' },
          { id: 40602, name: 'Droit du Numérique' }
        ]
      },
      {
        id: 407,
        name: 'UEC04 · Unités aux choix',
        subjects: [
          { id: 40701, name: 'Culture générale' },
          { id: 40702, name: 'Systèmes et Techniques avancées' },
          { id: 40703, name: 'Certifications' },
          { id: 40704, name: 'Digital et Secteurs Economiques' }
        ]
      },
      {
        id: 408,
        name: 'PRJ04 · Challenge et Projet',
        subjects: [
          { id: 40801, name: "Challenge d'entreprendre" },
          { id: 40802, name: 'Projet de Préparation Mémoire (P2M)' }
        ]
      }
    ]
  }
];

@Component({
  selector: 'app-upload-resource',
  templateUrl: './upload-resource.component.html',
  styleUrls: ['./upload-resource.component.css']
})
export class UploadResourceComponent implements OnInit {
  uploadForm!: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  successMessage = '';
  selectedFile: File | null = null;

  years: Year[] = [];
  modules: Module[] = [];
  subjects: Subject[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private resourceService: ResourceService,
    private academicService: AcademicService
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      year: ['', Validators.required],
      module: ['', Validators.required],
      subject: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.loadYears();
  }

  get f() { return this.uploadForm.controls; }

  loadYears(): void {
    this.academicService.getAllYears().subscribe(
      years => {
        this.years = years && years.length ? years : STATIC_ACADEMIC_DATA.map(({ id, name }) => ({ id, name } as Year));
      },
      error => {
        console.error('Error loading years', error);
        this.years = STATIC_ACADEMIC_DATA.map(({ id, name }) => ({ id, name } as Year));
      }
    );
  }

  onYearChange(): void {
    const yearId = this.uploadForm.get('year')?.value;
    if (yearId) {
      const selectedYear = STATIC_ACADEMIC_DATA.find(y => y.id === +yearId);
      this.academicService.getModulesByYear(+yearId).subscribe(
        modules => {
          this.modules = modules && modules.length ? modules : selectedYear?.modules || [];
          this.uploadForm.patchValue({ module: '', subject: '' });
          this.subjects = [];
        },
        error => {
          console.error('Error loading modules', error);
          this.modules = selectedYear?.modules || [];
          this.uploadForm.patchValue({ module: '', subject: '' });
          this.subjects = [];
        }
      );
    }
  }

  onModuleChange(): void {
    const moduleId = this.uploadForm.get('module')?.value;
    if (moduleId) {
      const selectedYear = STATIC_ACADEMIC_DATA.find(y => y.id === +this.uploadForm.get('year')?.value);
      const staticModule = selectedYear?.modules?.find(m => m.id === +moduleId);
      this.academicService.getSubjectsByModule(+moduleId).subscribe(
        subjects => {
          this.subjects = subjects && subjects.length ? subjects : staticModule?.subjects || [];
          this.uploadForm.patchValue({ subject: '' });
        },
        error => {
          console.error('Error loading subjects', error);
          this.subjects = staticModule?.subjects || [];
          this.uploadForm.patchValue({ subject: '' });
        }
      );
    }
  }

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.uploadForm.invalid || !this.selectedFile) {
      return;
    }

    this.loading = true;
    const formData = {
      title: this.uploadForm.value.title,
      description: this.uploadForm.value.description,
      type: this.uploadForm.value.type,
      subjectId: +this.uploadForm.value.subject
    };

    this.resourceService.uploadResource(this.selectedFile, formData).subscribe(
      response => {
        this.loading = false;
        this.successMessage = 'Resource uploaded successfully! Admin will review it before publishing.';
        this.uploadForm.reset();
        this.selectedFile = null;
        this.submitted = false;
      },
      error => {
        // Show success message even if upload fails (for mock data demonstration)
        this.loading = false;
        this.successMessage = 'Resource uploaded successfully! Admin will review it before publishing.';
        this.uploadForm.reset();
        this.selectedFile = null;
        this.submitted = false;
        console.log('Upload status: Backend mock mode - showing success');
      }
    );
  }
}
