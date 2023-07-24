import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isAuthenticated()) {

    return true;
  } else {
    inject(AuthService).logout();
    inject(Router).navigate(['/admin', ['login']])

    return false;
  }
};
