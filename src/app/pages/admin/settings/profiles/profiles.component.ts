import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { StorageService } from './../../../../services/storage.service';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: []
})
export class ProfilesComponent implements OnInit {

  public data: any;
  public profile: any;
  public isLoading: boolean;
  constructor(
    private api: ApiService,
    private storage: StorageService,
    private router: Router,
    private loading: LoadingService
  ) {
    this.loading.isLoading.subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnInit(): void {
    this.api.all('profiles').subscribe(profiles => {
      this.data = profiles;
    });
    this.storage.destroy('__profile');
  }

  setProfile(profile: any): void {
    this.profile = profile;
  }

  goToProfile(profile: any): void {
    this.storage.save('__profile', profile);
    this.router.navigate(['/admin/configuraciones/perfil', profile.id]);
  }

  delete(id: number): void {
    this.api.delete(`profiles/${id}`).subscribe(response => {
      this.data.map(item => {
        if (item.id === id) {
          item.status = 0;
        }
      });
    });
  }

}
