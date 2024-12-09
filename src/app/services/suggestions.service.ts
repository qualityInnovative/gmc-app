import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuggestionsService {
  

  constructor(private http: HttpClient) {}

  
  /**
   * Fetch a single suggestion by its ID.
   * @param suggestionId Suggestion ID.
   * @returns Observable of the API response.
   */
  getSuggestionById(suggestionId: number): Observable<any> {
    return this.http.post(`${environment.acogsApiUrl}/suggestions/getone`,{id:suggestionId});
  }

  /**
   * Delete a suggestion by marking it as deleted.
   * @param suggestionId Suggestion ID.
   * @returns Observable of the API response.
   */
  deleteSuggestion(suggestionId: string): Observable<any> {
    return this.http.post(`${environment.acogsApiUrl}/delete`, { id: suggestionId });
  }

  /**
   * Fetch paginated suggestions for admin.
   * @param page Current page number.
   * @param limit Number of items per page.
   * @returns Observable of the API response.
   */
  getAllSuggestionsByAdmin(page: number, limit: number): Observable<any> {
    return this.http.post(`${environment.acogsApiUrl}/suggestions/getallsuggestionsbyadmin`, {
      page,
      limit,
    });
  }
}
