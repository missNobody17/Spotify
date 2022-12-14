import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  id: string;
  track: any;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService, private location: Location) { 
    route.params.subscribe(params => {this.id = params['id'];})
  }

  ngOnInit(): void {
    this.spotify.getTrack(this.id).subscribe((res: any) => this.renderTrack(res));
  }

  back(): void {
    this.location.back();
  }

  renderTrack(res: any): void {
    console.log(res);
    this.track = res;
  }

}
