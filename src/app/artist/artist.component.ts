import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  id: string;
  artist: any;

  constructor(private route: ActivatedRoute, private service: SpotifyService, private location: Location) {
    route.params.subscribe((params) => {this.id = params['id']});
  }

  ngOnInit(): void {
    this.service.getArtist(this.id).subscribe((res: any) => this.renderArtist(res));
  }

  renderArtist(res: any): void {
    this.artist = res;
  }

  back(): void {
    this.location.back();
  }

}
