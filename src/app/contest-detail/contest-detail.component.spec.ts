import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions,
  Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ContestService } from '../contest.service';
import { ContestDetailComponent } from './contest-detail.component';

describe('ContestDetailComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        ContestService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
            return new Http(backend, options);
          },
          deps: [ MockBackend, BaseRequestOptions ]
        }
      ]
    });
  });

  let component: ContestDetailComponent;
  let fixture: ComponentFixture<ContestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
