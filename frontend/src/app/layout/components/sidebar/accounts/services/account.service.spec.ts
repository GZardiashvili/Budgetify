import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { AccountService } from './account.service';


describe('Account service', () => {
  let spectator: SpectatorHttp<AccountService>;
  const createHttp = createHttpFactory(AccountService);
  const apiUrl = 'http://localhost:3000';
  beforeEach(() => {
    spectator = createHttp();
  });
  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
  it('should test HttpClient.get', () => {
    spectator.service.getAccounts().subscribe();
    spectator.expectOne(`${apiUrl}/accounts`, HttpMethod.GET);
  });

  it('should test HttpClient.post', () => {
    const account = {
      id: 'id',
      user: 'user',
      title: 'title',
      description: 'description',
      currency: 'currency',
      availableAmount: 10000,
      dateOfCreation: new Date(),
      dateOfUpdate: new Date(),
    };
    spectator.service.addAccount(account).subscribe();
    const req = spectator.expectOne(`${apiUrl}/accounts/create`, HttpMethod.POST);
    expect(req.request.body).toEqual(account);
  });

  it('should test HttpClient.get by id', () => {
    const id = 'id';
    spectator.service.getAccountById(id).subscribe();
    spectator.expectOne(`${apiUrl}/accounts/${id}`, HttpMethod.GET);
  });
});
