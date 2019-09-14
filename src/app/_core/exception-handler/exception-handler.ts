import {ErrorHandler, Injectable, Provider} from '@angular/core';

@Injectable()
export class ExceptionHandler implements ErrorHandler {
  handleError(error: any): void {
    if (error.name === 'FirebaseError') {
      switch (error.code) {
        case 'permission-denied':
      }
    }
    throw error;
  }
}

export const EXCEPTION_HANDLER_PROVIDER: Provider = {
  provide: ErrorHandler,
  useClass: ExceptionHandler
};
