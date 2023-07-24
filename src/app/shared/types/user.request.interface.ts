import { UserInterface } from './user.interface';

export interface UserRequestInterface extends UserInterface {
  returnSecureToken: boolean;
}
