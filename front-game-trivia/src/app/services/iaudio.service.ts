import { InjectionToken } from '@angular/core';
import { AudioService } from "./audio.service";
import { Observable } from 'rxjs';

export const IAudioServiceToken = new InjectionToken<IAudioService>('IAudioService');
export const IAudioServiceTokenProvider = { provide: IAudioServiceToken, useClass: AudioService };

export interface IAudioService {

    soundsOn : Observable<boolean>;
  
    setSoundsActive(soundsOn : boolean) : void;
    playFailSound() : void;
    playSuccessSound() : void;
    playEndSound() : void;

}