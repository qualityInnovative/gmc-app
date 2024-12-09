import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuggestionsService } from 'src/app/services/suggestions.service';

@Component({
  selector: 'ratelist-viewsuggestions',
  templateUrl: './viewsuggestions.component.html',
  styleUrls: ['./viewsuggestions.component.scss']
})
export class ViewsuggestionsComponent implements OnInit {
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  suggestion: any = {}; // Holds the detailed suggestion data
  suggestionId: number | null = null; // ID of the suggestion to be viewed
  constructor(
    private route: ActivatedRoute, 
    private suggestionsService: SuggestionsService
  ) {}
  ngOnInit(): void {
    // Get the suggestion ID from the route parameters
    this.suggestionId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.suggestionId) {
      this.getSuggestionDetails(this.suggestionId);
    } else {
      this.errorStatus = true;
      this.error = 'Invalid suggestion ID.';
    }
  }

  // Fetch the details of the suggestion
  getSuggestionDetails(id: number) {
    this.loading = true;
    this.errorStatus = false;
    this.error = '';

    this.suggestionsService.getSuggestionById(id).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.success) {
          this.suggestion = res.data;
          
          console.log(this.suggestion)
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
}
