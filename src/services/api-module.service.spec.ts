import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiModuleService } from './api-module.service';
import { environment } from './../enviroments/enviromets';
import { IApiResponse } from '../interfaces/IApiResponse';
import { IMetaSerializer } from '../interfaces/imeta.model';

describe('ApiModuleService', () => {
  let service: ApiModuleService;
  let httpMock: HttpTestingController;
  let mockHttpClient: HttpClient;
  const mockModuleName = 'testModule';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiModuleService,
        { provide: 'moduleName', useValue: mockModuleName }
      ]
    });

    service = TestBed.inject(ApiModuleService);
    httpMock = TestBed.inject(HttpTestingController);
    mockHttpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay solicitudes pendientes al final de cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getResponse and return IApiResponse', () => {
    const mockParams = { param1: 'value1' };
    const mockResponse = {
      exito: true,
      meta: { key: 'value' },
      data: { id: 1, name: 'test' }
    };

    const mockMapper = jasmine.createSpy('mapper').and.callFake((data: any) => data);
    service.getResponse(mockParams, mockMapper).subscribe((res: IApiResponse<any>) => {
      expect(res.exito).toBeTrue();
      expect(res.meta).toBeDefined();
      expect(mockMapper).toHaveBeenCalledWith(mockResponse.data);
    });

    const req = httpMock.expectOne(`${environment.apiUrlBase}/api/${mockModuleName}?param1=value1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simula la respuesta de la API
  });

  it('should handle HTTP error', () => {
    const mockParams = { param1: 'value1' };

    service.getResponse(mockParams, (data: any) => data).subscribe(
      () => fail('expected an error, not data'),
      (error: string) => {
        expect(error).toContain('Error en');
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrlBase}/api/${mockModuleName}?param1=value1`);
    expect(req.request.method).toBe('GET');

    // Simula un error de red
    req.error(new ErrorEvent('Network error'));
  });
});
