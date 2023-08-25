import { InjectionToken } from "@angular/core";
import { ArrayUtilitiesService } from "./array-utilities.service";

export const IArrayUtilitiesServiceToken = new InjectionToken<IArrayUtilitiesService>('IArrayUtilitiesServiceToken');
export const IArrayUtilitiesServiceTokenProvider = { provide: IArrayUtilitiesServiceToken, useClass: ArrayUtilitiesService };

export interface IArrayUtilitiesService {
    shuffleArray<T>(array: T[]): T[];
  }