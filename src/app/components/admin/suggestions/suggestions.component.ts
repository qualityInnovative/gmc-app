import { Component, OnInit, OnDestroy } from '@angular/core';
import { faEdit, faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { SuggestionsService } from 'src/app/services/suggestions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ratelist-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit, OnDestroy {
  suggestions: any[] = [];
  faEye = faEye;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  page: number = 1; // Current page
  limit: number = 10; // Items per page
  totalCount: number = 0; // Total number of items
  totalPages: number = 0; // Total number of pages

  constructor(
    private router: Router,
    private suggestionService: SuggestionsService
    
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering: true
    };
    this.getAllSuggestions();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe(); // Prevent memory leaks
  }

  // Navigate to the suggestion view page
  viewSuggestion(id: number) {
    this.router.navigate(['admin/suggestions/view', id]);
  }

  // Delete a suggestion
  deleteSuggestion(suggestion: any) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.suggestionService.deleteSuggestion(suggestion.id).subscribe(
        (res: any) => {
          if (res.success) {
            this.getAllSuggestions();
          }
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  // Fetch all suggestions with pagination
  getAllSuggestions() {
    this.loading = true;
    this.errorStatus = false;
    this.error = '';
    this.suggestionService.getAllSuggestionsByAdmin(this.page, this.limit).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.success) {
          this.suggestions = res.data;
          this.totalCount = res.totalCount;
          this.totalPages = Math.ceil(this.totalCount / this.limit);
          this.dtTrigger.next(undefined)
        } else {
          this.errorStatus = true;
          this.error = res.message;
        }
      },
      (err) => {
        this.loading = false;
        this.errorStatus = true;
        this.error = err.message;
      }
    );
  }

  // Change to the next page
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getAllSuggestions();
    }
  }

  // Change to the previous page
  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getAllSuggestions();
    }
  }

  // Navigate to a specific page
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.getAllSuggestions();
    }
  }
}
